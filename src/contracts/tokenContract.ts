import { ethers } from "ethers";
import { Config } from "../config";

class TokenContract {
  private readonly provider = new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${Config.INFURA_PROJECT_ID}`
  );

  private readonly contract: ethers.Contract;

  constructor(address: string) {
    this.contract = new ethers.Contract(
      address,
      ["function balanceOf(address owner) view returns (uint256)"],
      this.provider
    );
  }

  getContract() {
    return this.contract;
  }

  balanceOf(walletAddress: string) {
    return this.contract.balanceOf(walletAddress);
  }
}

export default TokenContract;
