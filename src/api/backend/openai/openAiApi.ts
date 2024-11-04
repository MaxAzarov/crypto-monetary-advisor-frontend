import { GetApiFunc, makeEndpoint } from "../base";
import { askMessage } from "./askMessage/askMessage";

export function createOpenAiApi(getApi: GetApiFunc) {
  return {
    askMessage: makeEndpoint(askMessage, getApi),
  };
}
