import { map, distinct, pairwise, tap, share } from "rxjs/operators";
import { CC_PRICE_SLOPE_ADJUST } from "../constants/params";
import { priceEmitter } from "../sockets";
import { getTimeLabel } from "../helpers/getTimeLabel";
import calculateTrend from "../helpers/calculateTrend";
import { Observable } from "rxjs";

export const trendEmitter: Observable<{
  data: [number, number];
  trend: number;
}> = priceEmitter.pipe(
  map((value) => Math.floor(value * CC_PRICE_SLOPE_ADJUST)),
  distinct(),
  tap(() => console.log(`captured chunk at ${getTimeLabel(new Date())}`)),
  pairwise(),
  map((data) => ({ data, trend: calculateTrend(data) })),
  tap(({ trend }) => {
    console.log(
      `calculating blob at ${getTimeLabel(new Date())} trend=${trend}`
    );
  }),
  share()
);
