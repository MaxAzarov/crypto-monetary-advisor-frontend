import { AddWalletRequest, AddWalletResponse } from "./apiTypes";
import { AddWalletRequestApi, AddWalletResponseApi } from "./apiTypes.server";

export function mapRequest(request: AddWalletRequest): AddWalletRequestApi {
  return {
    ...request,
  };
}

export function mapResponse(
  responseApi: AddWalletResponseApi
): AddWalletResponse {
  return {
    ...responseApi,
  };
}
