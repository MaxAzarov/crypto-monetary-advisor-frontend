import { UserApi } from "src/api/commonTypes";
import { GetMeResponse } from "./apiTypes";
import { GetMeResponseApi } from "./apiTypes.server";

export const mapResponse = (responseApi: GetMeResponseApi): GetMeResponse => {
  let user = responseApi;

  user = user as UserApi;

  return {
    ...user,
  };
};
