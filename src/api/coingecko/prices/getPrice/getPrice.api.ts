import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  GetTokenPriceRequestApi,
  GetTokenPriceResponseApi,
} from "./apiTypes.server";

export const getPriceApi = async (
  api: AxiosInstance,
  request: GetTokenPriceRequestApi
): Promise<GetTokenPriceResponseApi> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/`,
    params: {
      contract_addresses: request.contractId,
      vs_currencies: "usd",
    },
  };

  const { data } = await api.request<
    GetTokenPriceResponseApi,
    AxiosResponse<GetTokenPriceResponseApi>
  >(config);

  return data;
};
