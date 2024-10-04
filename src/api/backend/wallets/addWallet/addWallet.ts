import { AddWalletRequest, AddWalletResponse } from "./apiTypes";
import { GetApiFunc } from "../../../base";
import { mapRequest, mapResponse } from "./mappers";
import { addWalletApi } from "./addWallet.api";

export const addWallet = async (
  getApi: GetApiFunc,
  request: AddWalletRequest
): Promise<AddWalletResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await addWalletApi(api, requestApi).then(mapResponse);
};
