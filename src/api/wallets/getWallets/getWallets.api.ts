import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { GetWalletsRequestApi, GetWalletsResponseApi } from "./apiTypes.server";

export const getWalletsApi = async (
  api: AxiosInstance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: GetWalletsRequestApi
): Promise<GetWalletsResponseApi> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/wallets`,
  };

  const { data } = await api.request<
    GetWalletsResponseApi,
    AxiosResponse<GetWalletsResponseApi>
  >(config);

  return data;
};
