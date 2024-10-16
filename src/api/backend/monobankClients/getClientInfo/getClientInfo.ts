import { GetApiFunc } from "../../base";
import { getClientInfoApi } from "./getClientInfo.api";
import { GetClientInfoRequest, GetClientInfoResponse } from "./apiTypes";
import { mapRequest, mapResponse } from "./mappers";

export const getClientInfo = async (
  getApi: GetApiFunc,
  request: GetClientInfoRequest
): Promise<GetClientInfoResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await getClientInfoApi(api, requestApi).then(mapResponse);
};
