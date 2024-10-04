import { DeleteWalletRequest, DeleteWalletResponse } from "./apiTypes";
import {
  DeleteWalletRequestApi,
  DeleteWalletResponseApi,
} from "./apiTypes.server";

export function mapRequest(
  request: DeleteWalletRequest
): DeleteWalletRequestApi {
  return request;
}

export function mapResponse(
  responseApi: DeleteWalletResponseApi
): DeleteWalletResponse {
  return {
    ...responseApi,
  };
}
