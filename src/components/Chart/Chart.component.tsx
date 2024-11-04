import { useRef, useLayoutEffect } from "react";
import {
  createChart,
  Time,
  SeriesMarker,
  LineStyle,
  UTCTimestamp,
} from "lightweight-charts";
import { getTimeLabel } from "../../helpers/getTimeLabel";
import { priceEmitter } from "../../sockets";
import { trendEmitter } from "../../emitters/trendEmitter";
import { Observable } from "rxjs";
import { distinct, tap } from "rxjs/operators";
import { TypeStatus } from "../../hooks/useInformer";

interface IChartProps {
  predictEmitter: Observable<TypeStatus>;
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
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { current: chartElement } = elementRef;

    if (!chartElement) return;

    const chart = createChart(chartElement, {
      ...CHART_OPTIONS,
      height,
      width,
    });

    const priceSeries = chart.addLineSeries({
      ...SERIES_OPTIONS,
    });

    let markers: SeriesMarker<Time>[] = [];
    let lastPrice: number = 0;

    const updateMarkers = () => {
      markers = markers.slice(-10);
      priceSeries.setMarkers(markers);
    };

    const priceSubscription = priceEmitter.subscribe((value) => {
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

    const trendSubscription = trendEmitter.subscribe(({ trend }) => {
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

    const predictSubscription = predictEmitter
      .pipe(
        distinct(), // Ensure we only act on distinct predictions
        tap((trend) => {
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
          } else if (trend === "downward") {
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
          } else if (trend === "train") {
            line.applyOptions({
              title: "",
              color: "transparent",
              price: 0,
            });
          }
          updateMarkers();
        })
      )
      .subscribe();

    return () => {
      chart.remove();
      priceSubscription.unsubscribe();
      trendSubscription.unsubscribe();
      predictSubscription.unsubscribe();
    };
  }, [height, width, predictEmitter]);

  return <div ref={elementRef} style={{ height, width }} />;
};
