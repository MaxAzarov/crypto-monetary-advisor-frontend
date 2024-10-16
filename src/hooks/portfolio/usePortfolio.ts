import { useEffect, useState } from "react";
import { Wallet } from "../../api/commonTypes/wallet";
import { useWallets } from "../wallets/useWallets";
import { useMonobankClients } from "../monobankClient/useMonobankClients";
import { MonobankClient } from "../../api/commonTypes/monobankClient";

export type CryptoWallet = { type: "wallet" } & Wallet;

export type Monobank = { type: "monobank" } & MonobankClient;

export type PortfolioItem = CryptoWallet | Monobank;

export const usePortfolio = () => {
  const { accounts: monobankAccounts } = useMonobankClients({});
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
