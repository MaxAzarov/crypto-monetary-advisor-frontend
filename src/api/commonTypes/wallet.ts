import { User } from "./user";

export interface Wallet {
  id: number;
  accountAddress: string;
  createdAt: Date;
  walletName: string;
  userId?: number;
  user?: User;
}

export interface AddWallet {
  accountAddress: string;
  walletName: string;
}
