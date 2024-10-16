import { mapRequest, mapResponse } from "./mappers";
import {
  GetMonobankClientRequest,
  GetMonobankClientResponse,
} from "./apiTypes";
import { getMonobankClientsApi } from "./getMonobankClients.api";
import { GetApiFunc } from "../../base";

export const getMonobankClients = async (
  getApi: GetApiFunc,
  request: GetMonobankClientRequest
): Promise<GetMonobankClientResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await getMonobankClientsApi(api, requestApi).then(mapResponse);
};
