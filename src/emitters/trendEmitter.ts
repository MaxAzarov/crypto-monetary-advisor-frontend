import { Source, Operator } from "react-declarative";
import {
  CC_PRICE_SLOPE_ADJUST,
  CC_TRAIN_WINDOW_SIZE,
} from "../constants/params";
import { priceEmitter } from "../sockets";
import { getTimeLabel } from "../helpers/getTimeLabel";
import calculateTrend from "../helpers/calculateTrend";

const TRAIN_PAIRWISE_SIZE = CC_TRAIN_WINDOW_SIZE + 1;

export const trendEmitter = Source.multicast(() =>
  priceEmitter
    .map((value) => Math.floor(value * CC_PRICE_SLOPE_ADJUST))
    .operator(Operator.distinct())
    .tap(() => console.log(`captured chunk at ${getTimeLabel(new Date())}`))
    .operator(Operator.pair(TRAIN_PAIRWISE_SIZE))
    .map((data) => ({ data, trend: calculateTrend(data) }))
    .tap(
      ({ trend }) =>
        `calculating blob at ${getTimeLabel(new Date())} trend=${trend}`
    )
);
