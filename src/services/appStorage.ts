export type AppStorageSchema = {
  apiToken?: string;
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
  }
}

function getStorageKey(key: string): string {
  return `token-${key}`;
}

export const appStorage = new AppStorage();
