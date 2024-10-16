/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ClientData } from "../../../commonTypes/monobankClientInfo";

export interface GetClientInfoRequestApi {
  id: number;
}

export interface GetClientInfoResponseApi extends ClientData {}
