import { AddWalletModal } from "../../../modals/wallets/AddWallet/AddWallet.component";
import { ViewWalletModal } from "../../../modals/wallets/ViewWallet/ViewWallet.components";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

export function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <>
      {children}

      <AddWalletModal />
      <ViewWalletModal />
    </>
  );
}
