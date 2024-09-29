import { AddWalletModal } from "../../../modals/wallets/AddWallet/AddWallet.component";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

export function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <>
      {children}
      <AddWalletModal />
    </>
  );
}
