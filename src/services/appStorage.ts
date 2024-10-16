/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MonobankWallet {
  monobankKey?: string;
  monobankName?: string;
}

export type AppStorageSchema = {
  apiToken?: string;
  wallets: MonobankWallet[];
};

class AppStorage {
  private get<T extends keyof AppStorageSchema>(
    key: T
  ): AppStorageSchema[T] | undefined {
    return localStorage.getItem(
      getStorageKey(key)
    ) as unknown as AppStorageSchema[T];
  }

  private async set<T extends keyof AppStorageSchema>(
    key: T,
    value: AppStorageSchema[T]
  ): Promise<void> {
    localStorage.setItem(getStorageKey(key), value as unknown as string);
  }

  private async remove<T extends keyof AppStorageSchema>(
    key: T
  ): Promise<void> {
    localStorage.removeItem(getStorageKey(key));
  }

  async getApiToken(): Promise<string> {
    return this.get("apiToken") || "";
  }

  async setApiToken(apiToken: string) {
    return await this.set("apiToken", apiToken);
  }

  async removeApiToken() {
    return await this.remove("apiToken");
  }

  async clearUserData() {
    await this.removeApiToken();
    await this.clearWallets();
  }

  async getWallets(): Promise<MonobankWallet[]> {
    return JSON.parse((this.get("wallets") as any) || []) || [];
  }

  async addWallet(wallet: MonobankWallet): Promise<void> {
    const wallets = await this.getWallets();
    wallets.push(wallet);
    await this.set("wallets", wallets);
  }

  async removeWallet(walletToRemove: MonobankWallet): Promise<void> {
    const wallets = await this.getWallets();
    const updatedWallets = wallets.filter(
      (wallet) => wallet.monobankKey !== walletToRemove.monobankKey
    );
    await this.set("wallets", updatedWallets);
  }

  async clearWallets(): Promise<void> {
    await this.remove("wallets");
  }
}

function getStorageKey(key: string): string {
  return `token-${key}`;
}

export const appStorage = new AppStorage();
