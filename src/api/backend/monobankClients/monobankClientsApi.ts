import { GetApiFunc, makeEndpoint } from "../base";
import { addMonobankClient } from "./addMonobankClient/addMonobankClient";
import { getClientInfo } from "./getClientInfo/getClientInfo";
import { getMonobankClients } from "./getMonobankClients/getMonobankClients";

export function createMonobankApi(getApi: GetApiFunc) {
  return {
    addMonobankClient: makeEndpoint(addMonobankClient, getApi),
    getMonobankClients: makeEndpoint(getMonobankClients, getApi),
    getClientInfo: makeEndpoint(getClientInfo, getApi),
  };
}
