import {
  GetMonobankClientRequest,
  GetMonobankClientResponse,
} from "./apiTypes";
import {
  GetMonobankClientsRequestApi,
  GetMonobankClientsResponseApi,
} from "./apiTypes.server";

export const mapResponse = (
  responseApi: GetMonobankClientsResponseApi
): GetMonobankClientResponse => {
  return responseApi;
};

export const mapRequest = (
  requestApi: GetMonobankClientsRequestApi
): GetMonobankClientRequest => {
  return requestApi;
};
