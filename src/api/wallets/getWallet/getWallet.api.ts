import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { GetWalletRequestApi, GetWalletResponseApi } from "./apiTypes.server";

export const getWalletApi = async (
  api: AxiosInstance,
  request: GetWalletRequestApi
): Promise<GetWalletResponseApi> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/wallets/${request.id}`,
  };

  const { data } = await api.request<
    GetWalletResponseApi,
    AxiosResponse<GetWalletResponseApi>
  >(config);

  return data;
};
