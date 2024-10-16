import {
  GetMonobankClientsRequestApi,
  GetMonobankClientsResponseApi,
} from "./apiTypes.server";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetMonobankClientRequest
  extends GetMonobankClientsRequestApi {}

export type GetMonobankClientResponse = GetMonobankClientsResponseApi;
