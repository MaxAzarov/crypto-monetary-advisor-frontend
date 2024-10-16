import { useEffect, useState } from "react";
import { Wallet } from "../../api/commonTypes/wallet";
import { MonobankWallet } from "../../services/appStorage";
import { useWallets } from "../wallets/useWallets";
import { useMonobankAccounts } from "../wallets/useMonobankAccounts";

export type PortfolioItem =
  | ({
      type: "wallet";
    } & Wallet)
  | ({ type: "monobank" } & MonobankWallet);

export const usePortfolio = () => {
  const { accounts: monobankAccounts } = useMonobankAccounts();
  const { wallets } = useWallets({});
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    // Combine Monobank accounts and wallets into a single portfolio
    const combinedPortfolio: PortfolioItem[] = [
      ...monobankAccounts.map((account) => ({
        ...account,
        type: "monobank" as const, // Explicitly define the type as 'monobank'
      })),
      ...wallets.map((wallet) => ({
        ...wallet,
        type: "wallet" as const, // Explicitly define the type as 'wallet'
      })),
    ];

    setPortfolio(combinedPortfolio);
  }, [monobankAccounts, wallets]); // Update portfolio when either accounts or wallets change

  return portfolio;
};
