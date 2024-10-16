import { GetApiFunc } from "../../base";
import { addMonobankClientApi } from "./addMonobankClient.api";
import {
  AddMonobankClientRequest,
  AddMonobankClientResponse,
} from "./apiTypes";
import { mapRequest, mapResponse } from "./mappers";

export const addMonobankClient = async (
  getApi: GetApiFunc,
  request: AddMonobankClientRequest
): Promise<AddMonobankClientResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await addMonobankClientApi(api, requestApi).then(mapResponse);
};
