import { GetMeResponse } from "./apiTypes";
import { mapResponse } from "./mappers";
import { getMeApi } from "./getMe.api";
import { GetApiFunc } from "src/api/base";

export const getMe = async (getApi: GetApiFunc): Promise<GetMeResponse> => {
  const api = await getApi();

  return await getMeApi(api).then(mapResponse);
};
