import { AxiosError } from "axios";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { GetMeResponse } from "../../api/auth/getMe/apiTypes";
import { APIErrorResponse } from "../../api/commonTypes/api";
import { Api } from "../../api/backend/api";
import { User } from "../../api/commonTypes/user";
import { cacheKeys } from "./auth.cacheKeys";

export const useCurrentUser = (
  options?: Omit<
    UseQueryOptions<GetMeResponse, AxiosError<APIErrorResponse>>,
    "queryFn" | "queryKey"
  >
): Omit<
  ExclusifyUnion<
    | ReturnType<typeof useQuery<unknown, AxiosError<APIErrorResponse>>> & {
        currentUser: User;
      }
  >,
  "data"
> => {
  const { data, ...rest } = useQuery(
    cacheKeys.currentUser() as QueryKey,
    async () => {
      return await Api.getMe();
    },
    { retry: false, retryOnMount: false, staleTime: 5 * 60 * 1000, ...options }
  );

  return {
    currentUser: data as User,
    ...rest,
  };
};
