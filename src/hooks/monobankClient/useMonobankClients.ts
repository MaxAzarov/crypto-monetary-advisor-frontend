import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { APIErrorResponse } from "../../api/commonTypes/api";
import { Api } from "../../api/backend/api";
import { GetMonobankClientRequest } from "../../api/backend/monobankClients/getMonobankClients/apiTypes";
import { cacheKeys } from "./monobankClient.cacheKeys";
import { GetMonobankClientsResponseApi } from "../../api/backend/monobankClients/getMonobankClients/apiTypes.server";

export function useMonobankClients(
  params: GetMonobankClientRequest,
  options?: Omit<
    UseQueryOptions<
      GetMonobankClientsResponseApi,
      AxiosError<APIErrorResponse>
    >,
    "queryFn" | "queryKey"
  >
) {
  const { data, ...rest } = useQuery(
    cacheKeys.getMonobankClients(),
    async () => {
      return await Api.getMonobankClients(params);
    },
    options
  );

  return {
    accounts: data || [],
    ...rest,
  };
}
