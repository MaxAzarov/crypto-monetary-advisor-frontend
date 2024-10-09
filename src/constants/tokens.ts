export type Tokens = "ETH" | "USDT" | "DAI" | "WBTC";

// ERC20 Token contract addresses, names, and icons for common cryptocurrencies
export const TOKENS: {
  [key: string]: {
    address: string;
    name: string;
    symbol: Tokens;
    icon: string;
    pair?: string;
  };
} = {
  ETH: {
    address: "", // ETH doesn't need an address since it's native
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    pair: "ETHUSDT",
  },
  USDT: {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    name: "Tether",
    symbol: "USDT",
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  DAI: {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    name: "Dai",
    symbol: "USDT",
    icon: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
  },
  WBTC: {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    icon: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png",
  },
};

export const pairs: Record<string, string> = {
  eth: "ETHUSDT",
  wbtc: "WBTCUSDT",
};
