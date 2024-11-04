import { Subject } from "rxjs";
import { io } from "socket.io-client";

import { getTimeLabel } from "../helpers/getTimeLabel";
import { Config } from "../config";

export const socket = io(`${Config.API_BASE_URL}/api/v1/socket`, {
  transports: ["websocket"],
});

export const priceEmitter = new Subject<number>();

socket.on("connect", () => {
  console.log(`Socket.io connected at ${getTimeLabel(new Date())}`);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
socket.on("candleData", (msg: any) => {
  const price = parseFloat(msg);
  priceEmitter.next(price); // Emit the price to subscribers
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
socket.on("connect_error", (error: any) => {
  console.error("Socket.io connection error:", error);
});

socket.on("disconnect", () => {
  console.log(`Socket.io disconnected at ${getTimeLabel(new Date())}`);
});

export const cleanup = () => {
  socket.disconnect();
};
