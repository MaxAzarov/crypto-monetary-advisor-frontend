import {
  AddMonobankClientRequest,
  AddMonobankClientResponse,
} from "./apiTypes";
import {
  AddMonobankClientRequestApi,
  AddMonobankClientResponseApi,
} from "./apiTypes.server";

export function mapRequest(
  request: AddMonobankClientRequest
): AddMonobankClientRequestApi {
  return {
    ...request,
  };
}

export function mapResponse(
  responseApi: AddMonobankClientResponseApi
): AddMonobankClientResponse {
  return {
    ...responseApi,
  };
}
