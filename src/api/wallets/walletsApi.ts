import { GetApiFunc, makeEndpoint } from "../base";
import { addWallet } from "./addWallet/addWallet";
import { deleteWallet } from "./deleteWallet/deleteWallet";
import { getWallet } from "./getWallet/getWallet";
import { getWallets } from "./getWallets/getWallets";

export function createWalletsApi(getApi: GetApiFunc) {
  return {
    getWallets: makeEndpoint(getWallets, getApi),
    addWallet: makeEndpoint(addWallet, getApi),
    getWallet: makeEndpoint(getWallet, getApi),
    deleteWallet: makeEndpoint(deleteWallet, getApi),
  };
}
