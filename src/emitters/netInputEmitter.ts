import {
  map,
  distinct,
  pairwise,
  mergeMap,
  share,
  bufferCount,
} from "rxjs/operators";
import { CC_INPUT_SIZE, CC_PRICE_SLOPE_ADJUST } from "../constants/params";
import { priceEmitter } from "../sockets";
import { percentDiff } from "../helpers/percenDiff";
import { toNeuralValue } from "../helpers/toNeuralValue";

export const netInputEmitter = priceEmitter.pipe(
  map((price) => price * CC_PRICE_SLOPE_ADJUST),
  distinct(),
  pairwise(),
  mergeMap(([a, b]) => [toNeuralValue(percentDiff(a, b))]),
  bufferCount(CC_INPUT_SIZE),
  share()
);

export default netInputEmitter;
