import { SignupRequest, SignupResponse } from "./apiTypes";
import { SignupRequestApi, SignupResponseApi } from "./apiTypes.server";

export function mapRequest(request: SignupRequest): SignupRequestApi {
  return request;
}

export function mapResponse(responseApi: SignupResponseApi): SignupResponse {
  return responseApi;
}
