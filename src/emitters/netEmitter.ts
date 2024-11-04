import {
  Subject,
  combineLatest,
  Observable,
  firstValueFrom,
  from,
  lastValueFrom,
  of,
} from "rxjs";
import {
  map,
  filter,
  tap,
  pairwise,
  bufferCount,
  switchMap,
} from "rxjs/operators";
import { NeuralNetwork } from "brain.js";

import { getTimeLabel } from "../helpers/getTimeLabel";
import { toNeuralValue } from "../helpers/toNeuralValue";
import { percentDiff } from "../helpers/percenDiff";
import { trendEmitter } from "./trendEmitter";
import { filterBullRun } from "../helpers/calculateTrend";
import {
  CC_TRAIN_TARGET_SIZE,
  CC_TRAIN_WINDOW_SIZE,
} from "../constants/params";
import { ITrainingStatus } from "brain.js/dist/feed-forward";
import { INeuralNetworkData } from "brain.js/dist/neural-network";

// Create observables for positive and negative sets
const positiveSetEmitter = new Subject<number[][]>();
const negativeSetEmitter = new Subject<number[][]>();

// Process for positive trend patterns
trendEmitter
  .pipe(
    filter(({ trend }) => trend === 1),
    map(({ data }) => data),
    switchMap((items) =>
      from(items).pipe(
        pairwise(),
        map(([a, b]) => toNeuralValue(percentDiff(a, b)))
      )
    ),
    bufferCount(CC_TRAIN_WINDOW_SIZE), // Collect arrays of CC_TRAIN_WINDOW_SIZE elements
    tap(() =>
      console.log(`checking raise pattern at ${getTimeLabel(new Date())}`)
    ),
    map((strides: number[]) => filterBullRun([strides], 1) as number[][]), // Ensure strides is number[][]
    filter((strides) => {
      console.log("🚀 ~ filter ~ strides:", strides);
      console.log(
        `chunk_size=${strides.length} required_size=${CC_TRAIN_TARGET_SIZE}`
      );
      if (strides.length < CC_TRAIN_TARGET_SIZE) {
        console.log(
          `raise pattern is not bull run ${getTimeLabel(new Date())}`
        );
        return false;
      }
      return true;
    }),
    tap(() =>
      console.log(`catched raise pattern at ${getTimeLabel(new Date())}`)
    )
  )
  .subscribe(positiveSetEmitter);

// Process for negative trend patterns
trendEmitter
  .pipe(
    filter(({ trend }) => trend === 1),
    map(({ data }) => data),
    switchMap((items) => {
      console.log("🚀 ~ switchMap ~ items:", items);

      return from(items).pipe(
        pairwise(),
        map(([a, b]) => toNeuralValue(percentDiff(a, b)))
      );
    }),
    bufferCount(CC_TRAIN_WINDOW_SIZE),
    tap(() =>
      console.log(`checking raise pattern at ${getTimeLabel(new Date())}`)
    ),
    map((strides: number[]) => {
      console.log("🚀 ~ map ~ strides:", strides);
      return filterBullRun([strides], 1);
    }),
    filter((strides) => {
      console.log(
        `chunk_size=${strides.length} required_size=${CC_TRAIN_TARGET_SIZE}`
      );
      if (strides.length < CC_TRAIN_TARGET_SIZE) {
        console.log(
          `raise pattern is not bull run ${getTimeLabel(new Date())}`
        );
        return false;
      }
      return true;
    }),
    tap(() =>
      console.log(`catched raise pattern at ${getTimeLabel(new Date())}`)
    )
  )
  .subscribe(positiveSetEmitter);

// Combine positive and negative sets into a training set
const netTrainsetEmitter: Observable<[number[][], number[][]]> = combineLatest([
  positiveSetEmitter,
  negativeSetEmitter,
]).pipe(
  tap(([positiveSet, negativeSet]) =>
    console.log(`starting training at ${getTimeLabel(new Date())}`, {
      positiveSet,
      negativeSet,
    })
  )
);

// Create the main emitter for training the neural network
export const neuralNetworkEmitter = new Observable<{
  net: NeuralNetwork<INeuralNetworkData, INeuralNetworkData>;
  status: ITrainingStatus;
}>((observer) => {
  const process = async () => {
    const [positiveSet, negativeSet] = await firstValueFrom(netTrainsetEmitter);
    console.log("🚀 ~ process ~ negativeSet:", negativeSet);
    console.log("🚀 ~ process ~ positiveSet:", positiveSet);

    const data = [
      ...positiveSet.map((input) => ({ input, output: [1, 0] })),
      ...negativeSet.map((input) => ({ input, output: [0, 1] })),
    ];

    const net = new NeuralNetwork({});

    const status = await net.trainAsync(data);

    console.log(
      `net trained error=${status.error} iterations=${
        status.iterations
      } ${getTimeLabel(new Date())}`
    );

    observer.next({ net, status });
    observer.complete();
  };

  process();
});
