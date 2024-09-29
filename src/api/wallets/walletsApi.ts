import { GetApiFunc, makeEndpoint } from "../base";
import { addWallet } from "./addWallet/addWallet";
import { getWallets } from "./getWallets/getWallets";

export function createWalletsApi(getApi: GetApiFunc) {
  return {
    getWallets: makeEndpoint(getWallets, getApi),
    addWallet: makeEndpoint(addWallet, getApi),
  };
}
