import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { Api } from "../../api/api";
import { cacheKeys } from "./wallets.cacheKeys";
import {
  GetWalletsRequest,
  GetWalletsResponse,
} from "../../api/wallets/getWallets/apiTypes";
import { APIErrorResponse } from "../../api/commonTypes/api";

export function useWallets(
  params: GetWalletsRequest,
  options?: Omit<
    UseQueryOptions<GetWalletsResponse, AxiosError<APIErrorResponse>>,
    "queryFn" | "queryKey"
  >
) {
  const { data, ...rest } = useQuery(
    cacheKeys.getWallets(),
    async () => {
      return await Api.getWallets(params);
    },
    options
  );

  return {
    wallets: data || [],
    ...rest,
  };
}
