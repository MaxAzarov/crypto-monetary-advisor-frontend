import { mapRequest, mapResponse } from "./mappers";
import { GetWalletsRequest, GetWalletsResponse } from "./apiTypes";
import { getWalletsApi } from "./getWallets.api";
import { GetApiFunc } from "../../base";

export const getWallets = async (
  getApi: GetApiFunc,
  request: GetWalletsRequest
): Promise<GetWalletsResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await getWalletsApi(api, requestApi).then(mapResponse);
};
