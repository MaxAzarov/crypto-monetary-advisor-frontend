/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { AutoSizer, sleep } from "react-declarative";
import { NeuralNetwork } from "brain.js";
import { getTimeLabel } from "../../../helpers/getTimeLabel";
import { CC_MAX_TRAIN_ERROR, CC_NET_TICK } from "../../../constants/params";
import netEmitter from "../../../emitters/netEmitter";
import { predictEmitter } from "../../../emitters/predictEmitter";
import useInformer from "../../../hooks/useInformer";
import { Chart } from "../../../components/Chart";
import { socket } from "../../../sockets";
import { useParams } from "react-router-dom";
import { pairs } from "../../../constants/tokens";
import { Card } from "../../../components/Card";
import {
  AdjustBox,
  ContainerBox,
  RootBox,
} from "./CryptoCurrencyTradingViewScreen.styles";
import netInputEmitter from "../../../emitters/netInputEmitter";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface INet extends NeuralNetwork<any, any> {}

const getPrediction = async (net: INet): Promise<[number, number]> => {
  console.log(`net predict input begin ${getTimeLabel(new Date())}`);
  const netInput = await netInputEmitter.toPromise();
  console.log(`net predict run begin ${getTimeLabel(new Date())}`);
  console.time("net-run");
  const [upward = 0, downward = 0] = Object.values(net.run(netInput));
  console.timeEnd("net-run");
  return [upward, downward] as [number, number];
};

export const CryptoCurrencyTradingViewScreen = () => {
  const params = useParams();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useInformer(predictEmitter);

  useEffect(() => {
    console.log(
      "Right now this app is collecting data of raise and fail patterns. Please wait for the following logs"
    );
  }, []);

  useEffect(
    () =>
      netEmitter.once(({ net, status }) => {
        if (status.error > CC_MAX_TRAIN_ERROR) {
          predictEmitter.next("untrained");
          return;
        }

        const process = async () => {
          let [prevUpward, prevDownward] = await getPrediction(net);
          await sleep(10_000);
          /**
           * Caution: Black Magic
           * this tool reacts to the change of delta of neural outputs instead
           * of values. this makes the emit of action faster in times
           */
          while (isMounted.current) {
            const [upward, downward] = await getPrediction(net);
            console.log(
              `net predict upward=${upward} downward=${downward} time=${getTimeLabel(
                new Date()
              )}`
            );
            const dUpward = Math.max(upward - prevUpward, 0);
            const dDownward = Math.max(downward - prevDownward, 0);
            const result = dUpward > dDownward ? "upward" : "downward";
            predictEmitter.next(result);
            prevUpward = upward;
            prevDownward = downward;
            await sleep(CC_NET_TICK);
          }
        };

        process();
        predictEmitter.next(null);
      }),
    []
  );

  useEffect(
    () =>
      netInputEmitter.connect(() => {
        console.log(`netInputEmitter tick ${getTimeLabel(new Date())}`);
      }),
    []
  );

  useEffect(() => {
    if (params.symbol) {
      const pair = pairs[params.symbol.toLowerCase()];

      if (pair) {
        socket.emit("subscribeToCandle", { pair });
      }
    }
  }, [params.symbol]);

  const pair = params?.symbol?.toLowerCase()
    ? pairs[params?.symbol?.toLowerCase()]
    : "";

  const CARD_LABEL = `BINANCE ticker:${pair} HIGH candle 1M`;

  return (
    <RootBox>
      <ContainerBox>
        <Card label={CARD_LABEL}>
          <AutoSizer>
            {({ height, width }) => (
              <Chart
                predictEmitter={predictEmitter}
                height={height}
                width={width}
              />
            )}
          </AutoSizer>
        </Card>
      </ContainerBox>
      <AdjustBox />
    </RootBox>
  );
};
