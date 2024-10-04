export type Tokens = "ETH" | "USDT" | "DAI";

// ERC20 Token contract addresses, names, and icons for common cryptocurrencies
export const tokens: {
  [key: string]: {
    address: string;
    name: string;
    symbol: Tokens;
    icon: string;
  };
} = {
  ETH: {
    address: "", // ETH doesn't need an address since it's native
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
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
};
