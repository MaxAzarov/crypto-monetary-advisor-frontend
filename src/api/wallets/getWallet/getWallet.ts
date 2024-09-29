import { mapRequest, mapResponse } from "./mappers";
import { GetWalletRequest, GetWalletResponse } from "./apiTypes";
import { getWalletApi } from "./getWallet.api";
import { GetApiFunc } from "../../base";

export const getWallet = async (
  getApi: GetApiFunc,
  request: GetWalletRequest
): Promise<GetWalletResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await getWalletApi(api, requestApi).then(mapResponse);
};
