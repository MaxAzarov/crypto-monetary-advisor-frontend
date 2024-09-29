import { GetWalletRequest, GetWalletResponse } from "./apiTypes";
import { GetWalletRequestApi, GetWalletResponseApi } from "./apiTypes.server";

export const mapResponse = (
  responseApi: GetWalletResponseApi
): GetWalletResponse => {
  if (!responseApi) return null;

  return {
    ...responseApi,
  };
};

export const mapRequest = (
  requestApi: GetWalletRequestApi
): GetWalletRequest => {
  return requestApi;
};
