import { GetApiFunc, makeEndpoint } from "../base";
import { getMe } from "./getMe/getMe";
import { login } from "./login/login";
import { signup } from "./signUp/signup";

export function createAuthApi(getApi: GetApiFunc) {
  return {
    login: makeEndpoint(login, getApi),
    getMe: makeEndpoint(getMe, getApi),
    signup: makeEndpoint(signup, getApi),
  };
}
