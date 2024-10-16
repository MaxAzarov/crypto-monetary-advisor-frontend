import { AxiosInstance, AxiosResponse } from "axios";

import {
  AddMonobankClientRequestApi,
  AddMonobankClientResponseApi,
} from "./apiTypes.server";

export const addMonobankClientApi = async (
  api: AxiosInstance,
  requestApi: AddMonobankClientRequestApi
): Promise<AddMonobankClientResponseApi> => {
  const { data } = await api.request<
    AddMonobankClientResponseApi,
    AxiosResponse<AddMonobankClientResponseApi>
  >({
    method: "post",
    url: "monobank/",
    data: requestApi,
  });

  return data;
};
