// CryptoCurrencyTradingViewScreen
import { useRef, useLayoutEffect } from "react";

import {
  TSubject,
  Operator,
  useSubject,
  useReloadTrigger,
} from "react-declarative";

import {
  createChart,
  Time,
  SeriesMarker,
  LineStyle,
  UTCTimestamp,
} from "lightweight-charts";
import { getTimeLabel } from "../../helpers/getTimeLabel";
import { priceEmitter } from "../../sockets";
import { CC_LIVENESS_DELAY } from "../../constants/params";
import { trendEmitter } from "../../libs/source/trendEmitter";

interface IChartProps {
  predictEmitter: TSubject<"train" | "upward" | "downward" | null>;
  height: number;
  width: number;
}

const CHART_OPTIONS = {
  layout: {
    textColor: "#d1d4dc",
    backgroundColor: "#0000",
  },
  rightPriceScale: {
    scaleMargins: {
      top: 0.3,
      bottom: 0.25,
    },
  },
  crosshair: {
    vertLine: {
      visible: false,
      labelVisible: false,
    },
    horzLine: {
      visible: false,
      labelVisible: false,
    },
  },
  grid: {
    vertLines: {
      color: "#f8b3",
    },
    horzLines: {
      color: "#f8b3",
    },
  },
  timeScale: {
    tickMarkFormatter: (time: number) => {
      const date = new Date(time);
      return getTimeLabel(date);
    },
  },
  handleScroll: {
    vertTouchDrag: false,
  },
} as const;

const SERIES_OPTIONS = {
  color: "#90cbfa",
  lineWidth: 2,
  crosshairMarkerVisible: false,
  lastValueVisible: false,
  priceLineVisible: false,
} as const;

export const Chart = ({ predictEmitter, height, width }: IChartProps) => {
  const elementRef = useRef<HTMLDivElement>(undefined as never);

  const predictChanged = useSubject(predictEmitter);
  const { reloadTrigger } = useReloadTrigger(600_000);

  useLayoutEffect(() => {
    const { current: chartElement } = elementRef;

    const chart = createChart(chartElement, {
      ...CHART_OPTIONS,
      height,
      width,
    });

    const priceSeries = chart.addLineSeries({
      ...SERIES_OPTIONS,
    });

    let markers: SeriesMarker<Time>[] = [];

    const updateMarkers = () => {
      markers = markers.slice(-10);
      priceSeries.setMarkers(markers);
    };

    let lastPrice: number = 0;

    const disconnectPriceEmitter = priceEmitter
      .operator(
        Operator.liveness(() => {
          // history.push("/error-page");
        }, CC_LIVENESS_DELAY)
      )
      .connect((value) => {
        lastPrice = value;
        priceSeries.update({ value, time: Date.now() as UTCTimestamp });
      });

    const line = priceSeries.createPriceLine({
      price: lastPrice,
      color: "transparent",
      lineWidth: 3,
      lineStyle: LineStyle.Solid,
      axisLabelVisible: true,
      title: "",
    });

    const disconnectTrendEmitter = trendEmitter.connect(({ trend }) => {
      if (trend === 1 || trend === -1) {
        markers = markers.filter(({ position }) => position !== "inBar");
        markers.push({
          time: Date.now() as Time,
          position: "inBar",
          color: "#ff84b0",
          shape: trend === 1 ? "circle" : "square",
          text: trend === 1 ? "Positive set" : "Negative set",
        });
      }
      updateMarkers();
    });

    const disconnectPredictEmitter = predictChanged
      .operator(Operator.distinct())
      .tap(() => disconnectTrendEmitter())
      .connect((trend: string) => {
        const date = new Date();
        if (trend === "upward") {
          line.applyOptions({
            title: `Raise predict ${getTimeLabel(date)}`,
            color: "#00a73e",
            price: lastPrice,
          });
          markers.push({
            time: Date.now() as Time,
            position: "belowBar",
            color: "#00a73e",
            shape: "arrowUp",
            text: "Upward",
          });
        }
        if (trend === "downward") {
          line.applyOptions({
            title: `Fail predict ${getTimeLabel(date)}`,
            color: "#e4000b",
            price: lastPrice,
          });
          markers.push({
            time: Date.now() as Time,
            position: "aboveBar",
            color: "#e4000b",
            shape: "arrowDown",
            text: "Downward",
          });
        }
        if (trend === "train") {
          line.applyOptions({
            title: "",
            color: "transparent",
            price: 0,
          });
        }
        updateMarkers();
      });

    return () => {
      chart.remove();
      disconnectPriceEmitter();
      disconnectPredictEmitter();
      disconnectTrendEmitter();
    };
  }, [height, width, predictChanged, reloadTrigger]);

  return <div ref={elementRef} />;
};
