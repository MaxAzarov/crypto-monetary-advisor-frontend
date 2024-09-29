import { atom } from "recoil";
import { ViewWalletModalState } from "./ViewWallet.types";

export const viewWalletModalStateAtom = atom<ViewWalletModalState>({
  key: "viewWalletModalStateAtom",
  default: { open: false },
});
