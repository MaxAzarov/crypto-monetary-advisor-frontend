import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { addWalletModalStateAtom } from "./AddWallet.state";
import { AddWalletModalState } from "./AddWallet.types";

export function useAddWalletModal() {
  const setModalState = useSetRecoilState(addWalletModalStateAtom);

  const openModal = useCallback(
    (params: DistributiveOmit<AddWalletModalState, "open">) => {
      setModalState({ open: true, ...params });
    },
    [setModalState]
  );

  const closeModal = useCallback(() => {
    setModalState({ open: false });
  }, [setModalState]);

  return {
    openAddWalletModal: openModal,
    closeAddWalletModal: closeModal,
  };
}
