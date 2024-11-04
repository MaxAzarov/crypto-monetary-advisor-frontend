import { createAuthApi } from "./auth/authApi";
import { appStorage } from "../../services/appStorage";
import { Config } from "../../config";
import { createWalletsApi } from "./wallets/walletsApi";
import { createAxiosInstance, GetApiFunc } from "./base";
import { createMonobankApi } from "./monobankClients/monobankClientsApi";
import { createOpenAiApi } from "./openai/openAiApi";

function createApi(getAxiosInstance: GetApiFunc) {
  return {
    ...createAuthApi(getAxiosInstance),
    ...createWalletsApi(getAxiosInstance),
    ...createMonobankApi(getAxiosInstance),
    ...createOpenAiApi(getAxiosInstance),
  };
}

export const Api = createApi(async () => {
  const tokenFromUrl = new URLSearchParams(window.location.search).get("token");
  const apiToken = tokenFromUrl || (await appStorage.getApiToken()) || "";
  const baseURL = `${Config.API_BASE_URL}`;

  return createAxiosInstance({ apiToken, baseURL });
});
