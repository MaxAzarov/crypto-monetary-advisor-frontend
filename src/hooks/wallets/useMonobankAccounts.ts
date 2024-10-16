import { useEffect, useState } from "react";
import { appStorage, MonobankWallet } from "../../services/appStorage";

export const useMonobankAccounts = () => {
  const [accounts, setAccounts] = useState<MonobankWallet[]>([]);

  const fetchAccounts = async () => {
    const storedAccounts = await appStorage.getWallets();
    setAccounts(storedAccounts);
  };

  const addAccount = async (newAccount: MonobankWallet) => {
    await appStorage.addWallet(newAccount);
    await fetchAccounts(); // Refresh the accounts after adding
  };

  const removeAccount = async (accountToRemove: MonobankWallet) => {
    await appStorage.removeWallet(accountToRemove);
    await fetchAccounts(); // Refresh the accounts after removing
  };

  useEffect(() => {
    fetchAccounts(); // Fetch accounts on mount
  }, []);

  return {
    accounts,
    addAccount,
    removeAccount,
  };
};
