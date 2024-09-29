import { GetWalletsRequest, GetWalletsResponse } from "./apiTypes";
import { GetWalletsRequestApi, GetWalletsResponseApi } from "./apiTypes.server";

export const mapResponse = (
  responseApi: GetWalletsResponseApi
): GetWalletsResponse => {
  return responseApi;
};

export const mapRequest = (
  requestApi: GetWalletsRequestApi
): GetWalletsRequest => {
  return requestApi;
};
