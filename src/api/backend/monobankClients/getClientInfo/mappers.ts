import { GetClientInfoRequest, GetClientInfoResponse } from "./apiTypes";
import {
  GetClientInfoRequestApi,
  GetClientInfoResponseApi,
} from "./apiTypes.server";

export function mapRequest(
  request: GetClientInfoRequest
): GetClientInfoRequestApi {
  return {
    ...request,
  };
}

export function mapResponse(
  responseApi: GetClientInfoResponseApi
): GetClientInfoResponse {
  return {
    ...responseApi,
  };
}
