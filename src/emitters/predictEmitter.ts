import { Subject } from "rxjs";
import { TypeStatus } from "../hooks/useInformer";

export const predictEmitter = new Subject<TypeStatus>();
