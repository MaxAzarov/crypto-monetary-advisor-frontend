import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { Api } from "../../api/backend/api";
import {
  GetWalletRequest,
  GetWalletResponse,
} from "../../api/backend/wallets/getWallet/apiTypes";
import { APIErrorResponse } from "../../api/commonTypes/api";
import { cacheKeys } from "./wallets.cacheKeys";

export function useWallet(
  params: GetWalletRequest,
  options?: Omit<
    UseQueryOptions<GetWalletResponse, AxiosError<APIErrorResponse>>,
    "queryFn" | "queryKey"
  >
) {
  const { data, ...rest } = useQuery(
    cacheKeys.getWallet(params.id),
    async () => {
      return await Api.getWallet(params);
    },
    options
  );

  return {
    wallet: data,
    ...rest,
  };
}
