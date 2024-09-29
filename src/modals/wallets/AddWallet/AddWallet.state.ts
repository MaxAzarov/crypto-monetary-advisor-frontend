import { atom } from "recoil";
import { AddWalletModalState } from "./AddWallet.types";

export const addWalletModalStateAtom = atom<AddWalletModalState>({
  key: "addWalletModalStateAtom",
  default: { open: false },
});
