import { AxiosInstance, AxiosResponse } from "axios";

import {
  DeleteWalletRequestApi,
  DeleteWalletResponseApi,
} from "./apiTypes.server";

export const deleteWalletApi = async (
  api: AxiosInstance,
  requestApi: DeleteWalletRequestApi
): Promise<DeleteWalletResponseApi> => {
  const { data } = await api.request<
    DeleteWalletResponseApi,
    AxiosResponse<DeleteWalletResponseApi>
  >({
    method: "delete",
    url: `wallets/${requestApi.id}`,
  });

  return data;
};
