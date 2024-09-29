export function formatAddress(address: string): string {
  // Ensure the address is in correct format and length
  if (!address || address.length !== 42) {
    throw new Error("Invalid Ethereum address");
  }

  const start = address.substring(0, 6); // Get the first 6 characters
  const end = address.substring(address.length - 4); // Get the last 4 characters

  return `${start}...${end}`; // Combine them with ellipsis
}
