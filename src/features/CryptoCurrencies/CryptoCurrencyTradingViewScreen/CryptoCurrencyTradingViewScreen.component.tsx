/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { NeuralNetwork } from "brain.js";
import { getTimeLabel } from "../../../helpers/getTimeLabel";
import { CC_MAX_TRAIN_ERROR, CC_NET_TICK } from "../../../constants/params";
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
import { distinct, take } from "rxjs/operators";
import { neuralNetworkEmitter } from "../../../emitters/netEmitter";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface INet extends NeuralNetwork<any, any> {}

const getPrediction = async (net: INet): Promise<[number, number]> => {
  console.log(`net predict input begin ${getTimeLabel(new Date())}`);
  const netInput = await netInputEmitter.toPromise();
  console.log(`net predict run begin ${getTimeLabel(new Date())}`);
  console.time("net-run");
  const [upward = 0, downward = 0] = Object.values(net.run(netInput as any));
  console.timeEnd("net-run");
  return [upward, downward] as [number, number];
};

export const CryptoCurrencyTradingViewScreen = () => {
  const params = useParams();
  const isMounted = useRef(false);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        setDimensions({
          width: chartRef.current.clientWidth,
          height: chartRef.current.clientHeight,
        });
      }
    };

    // Initial dimension set
    updateDimensions();

    // Update dimensions on window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useInformer(predictEmitter);

  useEffect(() => {
    console.log(
      "Right now this app is collecting data of raise and fail patterns. Please wait for the following logs"
    );
  }, []);

  useEffect(() => {
    const subscription = neuralNetworkEmitter
      .pipe(take(1))
      .subscribe(({ net, status }) => {
        if (status.error > CC_MAX_TRAIN_ERROR) {
          predictEmitter.next("untrained");
          return;
        }

        const process = async () => {
          let [prevUpward, prevDownward] = await getPrediction(net);
          await new Promise((resolve) => setTimeout(resolve, 10_000)); // Replacing sleep

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
            await new Promise((resolve) => setTimeout(resolve, CC_NET_TICK)); // Replacing sleep
          }
        };

        process();
        predictEmitter.next(null);
      });

    return () => {
      subscription.unsubscribe(); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const netInputSubscription = netInputEmitter
      .pipe(distinct())
      .subscribe(() => {
        console.log(`netInputEmitter tick ${getTimeLabel(new Date())}`);
      });

    // Cleanup subscription on unmount
    return () => {
      netInputSubscription.unsubscribe();
    };
  }, []);

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
      <ContainerBox ref={chartRef}>
        <Card label={CARD_LABEL}>
          <Chart
            predictEmitter={predictEmitter}
            height={dimensions.height}
            width={dimensions.width}
          />
        </Card>
      </ContainerBox>
      <AdjustBox />
    </RootBox>
  );
};
