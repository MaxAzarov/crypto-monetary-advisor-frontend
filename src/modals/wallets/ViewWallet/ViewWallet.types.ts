import { Wallet } from "../../../api/commonTypes/wallet";

interface ViewWalletModalWithWalletId {
  walletId?: string;
}

interface ViewWalletModalWithWalletEntity {
  wallet?: Pick<Wallet, "id">;
}

type ViewWalletModalStateBase = {
  open: boolean;
} & (ViewWalletModalWithWalletId | ViewWalletModalWithWalletEntity);

export type ViewWalletModalState = ExclusifyUnion<ViewWalletModalStateBase>;
