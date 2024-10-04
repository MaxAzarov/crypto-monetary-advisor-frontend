import { mapRequest, mapResponse } from "./mappers";
import { GetTokenPriceRequest, GetTokenPriceResponse } from "./apiTypes";
import { GetApiFunc } from "../../base";
import { getPriceApi } from "./getPrice.api";

export const getPrice = async (
  getApi: GetApiFunc,
  request: GetTokenPriceRequest
): Promise<GetTokenPriceResponse> => {
  const api = await getApi();
  const requestApi = mapRequest(request);

  return await getPriceApi(api, requestApi).then(mapResponse);
};
