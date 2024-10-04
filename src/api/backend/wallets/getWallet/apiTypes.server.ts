/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Wallet } from "../../../commonTypes/wallet";

export interface GetWalletRequestApi {
  id: number;
}

export interface GetWalletResponseApi extends Wallet {}
