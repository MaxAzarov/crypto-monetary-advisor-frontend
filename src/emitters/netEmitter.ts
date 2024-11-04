import { Source, Operator } from "react-declarative";
import { NeuralNetwork } from "brain.js";

import { getTimeLabel } from "../helpers/getTimeLabel";
import { toNeuralValue } from "../helpers/toNeuralValue";
import { percentDiff } from "../helpers/percenDiff";
import { trendEmitter } from "./trendEmitter";
import { netManager, trainManager } from "../libs/source/schema";
import { filterBullRun } from "../helpers/calculateTrend";
import {
  CC_INPUT_SIZE,
  CC_STRIDE_STEP,
  CC_TRAIN_TARGET_SIZE,
  CC_TRAIN_WINDOW_SIZE,
} from "../constants/params";

const positiveSetEmitter = Source.multicast<number[][]>(() =>
  trendEmitter
    .filter(({ trend }) => trend === 1)
    .map(({ data }) => data)
    .flatMap((items) => items)
    .operator(Operator.pair())
    .map(([a, b]) => toNeuralValue(percentDiff(a, b)))
    .operator(Operator.group(CC_TRAIN_WINDOW_SIZE))
    .operator(Operator.strideTricks(CC_INPUT_SIZE, CC_STRIDE_STEP))
    .tap(() => {
      const date = new Date();
      console.log(`checking raise pattern at ${getTimeLabel(date)}`);
    })
    .map((strides: number[][]) => filterBullRun(strides, 1))
    .filter((strides) => {
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
    })
    .tap(() => {
      const date = new Date();
      console.log(`catched raise pattern at ${getTimeLabel(date)}`);
    })
);

const negativeSetEmitter = Source.multicast<number[][]>(() =>
  trendEmitter
    .filter(({ trend }) => trend === -1)
    .map(({ data }) => data)
    .flatMap((items) => items)
    .operator(Operator.pair())
    .map(([a, b]) => toNeuralValue(percentDiff(a, b)))
    .operator(Operator.group(CC_TRAIN_WINDOW_SIZE))
    .operator(Operator.strideTricks(CC_INPUT_SIZE, CC_STRIDE_STEP))
    .tap(() => {
      const date = new Date();
      console.log(`checking fail pattern at ${getTimeLabel(date)}`);
    })
    .map((strides: number[][]) => filterBullRun(strides, -1))
    .filter((strides) => {
      console.log(
        `chunk_size=${strides.length} required_size=${CC_TRAIN_TARGET_SIZE}`
      );
      if (strides.length < CC_TRAIN_TARGET_SIZE) {
        console.log(`fail pattern is not bull run ${getTimeLabel(new Date())}`);
        return false;
      }
      return true;
    })
    .tap(() => {
      const date = new Date();
      console.log(`catched fail pattern at ${getTimeLabel(date)}`);
    })
);

const netTrainsetEmitter = Source.multicast(() =>
  Source.join([positiveSetEmitter, negativeSetEmitter], {
    race: true,
  }).tap(([positiveSet, negativeSet]) =>
    console.log(`starting trainment ${getTimeLabel(new Date())}`, {
      positiveSet,
      negativeSet,
    })
  )
);

export const netEmitter = Source.unicast(() =>
  Source.createCold((next) => {
    const process = async () => {
      const [positiveSet, negativeSet] = await netTrainsetEmitter.toPromise();

      const net = new NeuralNetwork({
        ...netManager.getValue()!,
      });

      const data = [
        ...positiveSet.map((input) => ({
          input,
          output: [1, 0],
        })),
        ...negativeSet.map((input) => ({
          input,
          output: [0, 1],
        })),
      ];

      const status = await net.trainAsync(data, trainManager.getValue()!);

      console.log(
        `net trained error=${status.error} iterations=${
          status.iterations
        } ${getTimeLabel(new Date())}`
      );

      next({ net, status });
    };

    process();
  })
);

export default netEmitter;
