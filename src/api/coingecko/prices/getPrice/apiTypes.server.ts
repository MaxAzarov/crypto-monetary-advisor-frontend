export interface GetTokenPriceRequestApi {
  contractId: string;
}

export interface GetTokenPriceResponseApi {
  [key: string]: {
    usd: number;
  };
}
