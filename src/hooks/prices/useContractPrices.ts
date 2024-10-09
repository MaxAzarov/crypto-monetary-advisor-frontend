import { useEffect, useState } from "react";
import { Api } from "../../api/coingecko/api";
import { TOKENS, Tokens } from "../../constants/tokens";

const defaultPricesData: Record<Tokens, number> = {
  USDT: 0,
  ETH: 0,
  DAI: 0,
  WBTC: 0,
};

const useContractPrices = () => {
  const [prices, setPrices] = useState<Record<Tokens, number>>({
    ...defaultPricesData,
  });

  const fetchPrices = async () => {
    const pricesData: Record<Tokens, number> = { ...defaultPricesData };

    try {
      // Fetch ETH price
      const ethResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      );
      const ethData = await ethResponse.json();
      pricesData.ETH = ethData.ethereum?.usd;

      await Promise.all(
        Object.values(TOKENS).map(async (item) => {
          if (item.address) {
            const response = await Api.getPrice({ contractId: item.address });

            pricesData[item.symbol] = response[item.address]?.usd;
          }
        })
      );

      setPrices(pricesData);
    } catch (error) {
      console.error("Failed to fetch prices", error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return { prices };
};

export default useContractPrices;
