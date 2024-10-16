import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { Api } from "../../api/backend/api";
import { APIErrorResponse } from "../../api/commonTypes/api";
import {
  GetClientInfoRequest,
  GetClientInfoResponse,
} from "../../api/backend/monobankClients/getClientInfo/apiTypes";
import { cacheKeys } from "./monobankClient.cacheKeys";

export function useClientInfo(
  params: GetClientInfoRequest,
  options?: Omit<
    UseQueryOptions<GetClientInfoResponse, AxiosError<APIErrorResponse>>,
    "queryFn" | "queryKey"
  >
) {
  const { data, ...rest } = useQuery(
    cacheKeys.getClientInfo(params.id),
    async () => {
      return await Api.getClientInfo(params);
    },
    options
  );
  console.log("🚀 ~ data:", data);

  return {
    clientInfo: data,
    ...rest,
  };
}
