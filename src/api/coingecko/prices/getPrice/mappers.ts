import { GetTokenPriceRequest, GetTokenPriceResponse } from "./apiTypes";
import {
  GetTokenPriceRequestApi,
  GetTokenPriceResponseApi,
} from "./apiTypes.server";

export const mapResponse = (
  responseApi: GetTokenPriceResponseApi
): GetTokenPriceResponse => {
  if (!responseApi) return null;

  return {
    ...responseApi,
  };
};

export const mapRequest = (
  requestApi: GetTokenPriceRequestApi
): GetTokenPriceRequest => {
  return requestApi;
};
