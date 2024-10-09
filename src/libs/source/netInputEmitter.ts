import { Operator, Source } from "react-declarative";

import { percentDiff } from "../../helpers/percenDiff";
import { toNeuralValue } from "../../helpers/toNeuralValue";
import { CC_INPUT_SIZE, CC_PRICE_SLOPE_ADJUST } from "../../constants/params";
import { priceEmitter } from "../../sockets";

const PAIRWISE_SIZE = CC_INPUT_SIZE + 1;

export const netInputEmitter = Source.multicast(() =>
  priceEmitter
    .map((price) => price * CC_PRICE_SLOPE_ADJUST)
    .operator(Operator.distinct())
    .operator(Operator.pair(PAIRWISE_SIZE))
    .flatMap((items) => items)
    .operator(Operator.pair())
    .map(([a, b]) => toNeuralValue(percentDiff(a, b)))
    .operator(Operator.group(CC_INPUT_SIZE))
    .share()
);

export default netInputEmitter;
