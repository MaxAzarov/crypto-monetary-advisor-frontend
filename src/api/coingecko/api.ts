import { appStorage } from "../../services/appStorage";
import { createAxiosInstance, GetApiFunc, makeEndpoint } from "./base";
import { getPrice } from "./prices/getPrice/getPrice";

function createApi(getAxiosInstance: GetApiFunc) {
  return {
    getPrice: makeEndpoint(getPrice, getAxiosInstance),
  };
}

export const Api = createApi(async () => {
  const tokenFromUrl = new URLSearchParams(window.location.search).get("token");
  const apiToken = tokenFromUrl || (await appStorage.getApiToken()) || "";
  const baseURL = `https://api.coingecko.com/api/v3/simple/token_price/ethereum`;

  return createAxiosInstance({ apiToken, baseURL });
});
