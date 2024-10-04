import { AxiosInstance, AxiosResponse } from 'axios';

import { GetMeResponseApi } from './apiTypes.server';

export const getMeApi = async (
  api: AxiosInstance,
): Promise<GetMeResponseApi> => {
  const config = { method: 'get', url: '/auth/me' };

  const { data } = await api.request<
    GetMeResponseApi,
    AxiosResponse<GetMeResponseApi>
  >(config);

  return data;
};
