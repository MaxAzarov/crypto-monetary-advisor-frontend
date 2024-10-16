export const cacheKeys = {
  getMonobankClient: (id: number) => ["monobankClient", id],
  getMonobankClients: () => ["monobankClient"],
  getClientInfo: (id: number) => ["clientInfo", id],
};
