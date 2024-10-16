import { AxiosInstance, AxiosResponse } from "axios";

import {
  GetClientInfoRequestApi,
  GetClientInfoResponseApi,
} from "./apiTypes.server";

export const getClientInfoApi = async (
  api: AxiosInstance,
  requestApi: GetClientInfoRequestApi
): Promise<GetClientInfoResponseApi> => {
  const { data } = await api.request<
    GetClientInfoResponseApi,
    AxiosResponse<GetClientInfoResponseApi>
  >({
    method: "get",
    url: `monobank/${requestApi.id}/client-info`,
  });

  return data;
};
