import { UserApi } from "src/api/commonTypes";

export interface LoginRequestApi {
  email: string;
  password: string;
}

export interface LoginResponseApi {
  token: string;
  user: UserApi;
}
