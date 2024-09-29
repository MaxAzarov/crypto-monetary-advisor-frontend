import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { viewWalletModalStateAtom } from "./ViewWallet.state";
import { ViewWalletModalState } from "./ViewWallet.types";

export function useViewWalletModal() {
  const setModalState = useSetRecoilState(viewWalletModalStateAtom);

  const openModal = useCallback(
    (params: DistributiveOmit<ViewWalletModalState, "open">) => {
      setModalState({ open: true, ...params });
    },
    [setModalState]
  );

  const closeModal = useCallback(() => {
    setModalState({ open: false });
  }, [setModalState]);

  return {
    openWalletBillModal: openModal,
    closeWalletBillModal: closeModal,
  };
}
