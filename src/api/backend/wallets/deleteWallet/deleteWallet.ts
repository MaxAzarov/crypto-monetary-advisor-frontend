import { DeleteWalletRequest, DeleteWalletResponse } from "./apiTypes";
import { mapRequest, mapResponse } from "./mappers";
import { GetApiFunc } from "../../../base";
import { deleteWalletApi } from "./deleteWallet.api";

export const deleteWallet = async (
  getApi: GetApiFunc,
  request: DeleteWalletRequest
): Promise<DeleteWalletResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await deleteWalletApi(api, requestApi).then(mapResponse);
};
