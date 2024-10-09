import { Subject } from "react-declarative";

export const predictEmitter = new Subject<
  "train" | "upward" | "downward" | "untrained" | null
>();
