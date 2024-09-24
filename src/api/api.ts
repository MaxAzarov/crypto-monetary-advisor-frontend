import { createAxiosInstance, GetApiFunc } from "./base";
import { createAuthApi } from "./auth/authApi";
import { appStorage } from "../services/appStorage";
import { Config } from "../config";

function createApi(getAxiosInstance: GetApiFunc) {
  return {
    ...createAuthApi(getAxiosInstance),
  };
}

export const Api = createApi(async () => {
  const tokenFromUrl = new URLSearchParams(window.location.search).get("token");
  const apiToken = tokenFromUrl || (await appStorage.getApiToken()) || "";
  const baseURL = `${Config.API_BASE_URL}`;

  return createAxiosInstance({ apiToken, baseURL });
});
