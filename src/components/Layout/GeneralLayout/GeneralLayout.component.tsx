import { AddWalletModal } from "../../../modals/wallets/AddWallet/AddWallet.component";
import { ViewWalletModal } from "../../../modals/wallets/ViewWallet/ViewWallet.components";
import { ChatPopup } from "../../ChatPopup";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

export function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <>
      {children}

      <ChatPopup />
      <AddWalletModal />
      <ViewWalletModal />
    </>
  );
}
