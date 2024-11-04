import { AxiosInstance, AxiosResponse } from "axios";

import { AskMessageRequestApi, AskMessageResponseApi } from "./apiTypes.server";

export const askMessageApi = async (
  api: AxiosInstance,
  requestApi: AskMessageRequestApi
): Promise<AskMessageResponseApi> => {
  const { data } = await api.request<
    AskMessageResponseApi,
    AxiosResponse<AskMessageResponseApi>
  >({
    method: "post",
    url: "openai/ask/",
    data: requestApi,
  });

  return data;
};
