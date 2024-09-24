import axios, { AxiosInstance, HttpStatusCode } from "axios";
import { ROUTES } from "../routing/routes";

export interface ApiConfig {
  baseURL: string;
  apiToken: string;
}

export type GetApiFunc = () => Promise<AxiosInstance>;

type InitialFunc<T extends unknown[]> = (
  getApi: GetApiFunc,
  ...args: T
) => unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;

export function makeEndpoint<
  T extends InitialFunc<Parameters<OmitFirstArg<T>>>
>(func: T, getApi: GetApiFunc): OmitFirstArg<T> {
  return ((...args: Parameters<OmitFirstArg<T>>) =>
    func(getApi, ...args)) as OmitFirstArg<T>;
}

export function createAxiosInstance({ baseURL, apiToken }: ApiConfig) {
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    baseURL,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === HttpStatusCode.Unauthorized) {
        window.location.href = ROUTES.login;
      }

      const errorsStr: string | undefined = error.response?.data.errors
        ? Object.values(
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            error.response?.data.errors!
          ).join(", ")
        : undefined;
      const errorStr: string | undefined = error.response?.data.error;

      if (errorsStr) error.response.data.message = errorsStr;
      if (errorStr) error.response.data.message = errorStr;

      return Promise.reject(error);
    }
  );

  return instance;
}
