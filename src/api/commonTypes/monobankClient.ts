import { User } from "./user";

export interface MonobankClient {
  id: number;
  monobankKey: string;
  monobankName: string;
  userId?: number;
  user?: User;
}

export interface AddMonobankClient {
  monobankKey: string;
  monobankName: string;
}
