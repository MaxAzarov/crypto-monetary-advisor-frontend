import { UserApi } from "src/api/commonTypes";

export interface SignupRequestApi
  extends Omit<UserApi, "deletedAt" | "createdAt" | "updatedAt"> {}

export interface SignupResponseApi extends UserApi {}
