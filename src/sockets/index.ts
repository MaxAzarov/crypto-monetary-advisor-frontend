import { Source } from "react-declarative";
import { io } from "socket.io-client";

import { randomString } from "../helpers/randomString";
import { getTimeLabel } from "../helpers/getTimeLabel";

export const priceEmitter = Source.multicast(() =>
  Source.create<number>((next) => {
    const socket = io("ws://localhost:4000/api/v1/socket", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log(`Socket.io connected at ${getTimeLabel(new Date())}`);
      socket.emit("authenticate", randomString()); // Sending auth token or random string

      const token = "your-authentication-token";

      socket.emit("subscribeToCandle", token);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("candleData", (msg: any) => {
      const price = parseFloat(msg);
      next(price); // Emit the price to subscribers
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("connect_error", (error: any) => {
      console.error("Socket.io connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log(`Socket.io disconnected at ${getTimeLabel(new Date())}`);
    });

    return () => {
      socket.disconnect(); // Clean up and close the connection
    };
  })
);
