import { AskMessageRequest, AskMessageResponse } from "./apiTypes";
import { AskMessageRequestApi, AskMessageResponseApi } from "./apiTypes.server";

export function mapRequest(request: AskMessageRequest): AskMessageRequestApi {
  return { ...request };
}

export function mapResponse(
  responseApi: AskMessageResponseApi
): AskMessageResponse {
  return { ...responseApi };
}
