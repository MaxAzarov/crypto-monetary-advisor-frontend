import { AxiosInstance, AxiosResponse } from "axios";

import { AddWalletRequestApi, AddWalletResponseApi } from "./apiTypes.server";

export const addWalletApi = async (
  api: AxiosInstance,
  requestApi: AddWalletRequestApi
): Promise<AddWalletResponseApi> => {
  const { data } = await api.request<
    AddWalletResponseApi,
    AxiosResponse<AddWalletResponseApi>
  >({
    method: "post",
    url: "wallets/",
    data: requestApi,
  });

  return data;
};
