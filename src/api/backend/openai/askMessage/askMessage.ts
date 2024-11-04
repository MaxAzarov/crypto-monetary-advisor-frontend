import { GetApiFunc } from "../../base";
import { AskMessageRequest, AskMessageResponse } from "./apiTypes";
import { askMessageApi } from "./askMessage.api";
import { mapRequest, mapResponse } from "./mappers";

export const askMessage = async (
  getApi: GetApiFunc,
  request: AskMessageRequest
): Promise<AskMessageResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await askMessageApi(api, requestApi).then(mapResponse);
};
