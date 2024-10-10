/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";

import { AutoSizer, sleep, Breadcrumbs } from "react-declarative";

import { NeuralNetwork } from "brain.js";

import Box from "@mui/material/Box";

import { getTimeLabel } from "../../../helpers/getTimeLabel";
import downloadFile from "../../../helpers/downloadFile";
import { CC_MAX_TRAIN_ERROR, CC_NET_TICK } from "../../../constants/params";
import netInputEmitter from "../../../libs/source/netInputEmitter";
import netEmitter from "../../../libs/source/netEmitter";
import { predictEmitter } from "../../../emitters/predictEmitter";
import useInformer from "../../../hooks/useInformer";
import makeStyles from "../../../styles/makeStyles";
import { Chart } from "../../../components/Chart";
import { socket } from "../../../sockets";
import { useParams } from "react-router-dom";
import { pairs } from "../../../constants/tokens";
import { Card } from "../../../components/Card";

const CARD_LABEL = "KUCOIN ticker:ETH-USDT HIGH candle 1M";

const useStyles = makeStyles()(() => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    flexDirection: "column",
  },
  container: {
    height: "calc(100vh - 80px)",
    width: "100%",
  },
  adjust: {
    flex: 1,
  },
}));

interface INet extends NeuralNetwork<any, any> {}

const options = [
  {
    action: "history-back",
    label: "Go back to net edit",
  },
  {
    action: "export-net",
    isDisabled: (net: INet | null) => !net,
    label: "Export to JS",
  },
];

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
  const { classes } = useStyles();
  const params = useParams();

  const [net, setNet] = useState<INet | null>();

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
        setNet(net as unknown as INet);
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
      const pair = pairs[params.symbol];

      if (pair) {
        socket.emit("subscribeToCandle", { pair });
      }
    }
  }, [params.symbol]);

  const handleAction = (action: string) => {
    if (action === "export-net") {
      const func = NeuralNetwork.prototype.toFunction;
      const code = func.apply(net).toString();
      downloadFile(code, `hypebot-net-${new Date().toISOString()}.json`);
    }
  };

  return (
    <Box className={classes.root}>
      <Breadcrumbs
        title="HypeNet"
        subtitle="TradePage"
        actions={options}
        payload={net}
        onAction={handleAction}
      />
      <Box className={classes.container}>
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
      </Box>
      <div className={classes.adjust} />
    </Box>
  );
};
