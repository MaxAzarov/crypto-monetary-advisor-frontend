import { useCallback, useEffect, useState } from "react";
import { useWallets } from "../wallets/useWallets";

import { ethers } from "ethers";
import { tokens, Tokens } from "../../constants/tokens";
import TokenContract from "../../contracts/tokenContract";

const useUserBalances = () => {
  const { wallets } = useWallets({});
  const [balances, setBalances] = useState<{
    [key: string]: { [token: string]: string };
  }>();

  const fetchBalances = useCallback(async () => {
    if (!wallets.length) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const updatedBalances: {
      [key: string]: {
        [token: string]: string;
      };
    } = {};

    for (const wallet of wallets) {
      const walletAddress = wallet.accountAddress;

      try {
        // Fetch ETH balance
        const ethBalance = await provider.getBalance(walletAddress);

        updatedBalances[walletAddress] = {
          ETH: ethers.formatEther(ethBalance),
        };
      } catch (error) {
        console.error("Error fetching ETH balance", error);
        updatedBalances[walletAddress] = { ETH: "Error fetching balance" };
      }

      // Fetch ERC20 token balances
      for (const [token, { address }] of Object.entries(tokens)) {
        try {
          if (address) {
            const contract = new TokenContract(address);
            const balance = await contract.balanceOf(walletAddress);
            updatedBalances[walletAddress][token as Tokens] =
              ethers.formatUnits(
                balance,
                token === "USDT" ? 6 : 18 // USDT uses 6 decimals, others use 18
              );
          }
        } catch (error) {
          console.error(`Failed to fetch ${token} balance`, error);
          updatedBalances[walletAddress][token as Tokens] =
            "Error fetching balance";
        }
      }
    }

    setBalances(updatedBalances);
  }, [wallets]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return { balances };
};

export default useUserBalances;
