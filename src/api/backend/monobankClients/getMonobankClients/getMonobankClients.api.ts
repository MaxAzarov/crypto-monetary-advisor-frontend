import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  GetMonobankClientsRequestApi,
  GetMonobankClientsResponseApi,
} from "./apiTypes.server";

export const getMonobankClientsApi = async (
  api: AxiosInstance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: GetMonobankClientsRequestApi
): Promise<GetMonobankClientsResponseApi> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/monobank`,
  };

  const { data } = await api.request<
    GetMonobankClientsResponseApi,
    AxiosResponse<GetMonobankClientsResponseApi>
  >(config);

  return data;
};
