import { AxiosInstance, AxiosResponse } from "axios";

import { SignupRequestApi, SignupResponseApi } from "./apiTypes.server";

export const signupApi = async (
  api: AxiosInstance,
  requestApi: SignupRequestApi
): Promise<SignupResponseApi> => {
  const { data } = await api.request<
    SignupResponseApi,
    AxiosResponse<SignupResponseApi>
  >({
    method: "post",
    url: "auth/signup",
    data: requestApi,
  });

  return data;
};
