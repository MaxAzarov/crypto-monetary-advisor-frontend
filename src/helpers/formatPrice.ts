export function formatPrice(amount: number, currencyCode: number): string {
  // Define a map of currency codes to their respective symbols
  const currencyMap: { [key: number]: string } = {
    980: "₴", // Ukrainian Hryvnia (UAH)
    840: "$", // US Dollar (USD)
    978: "€", // Euro (EUR)
    // Add more currency codes and symbols as needed
  };

  // Fallback if the currency is not recognized
  const currencySymbol = currencyMap[currencyCode] || "";

  // Format the number with comma separation for thousands and two decimal places
  const formattedAmount = (amount / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${currencySymbol}${formattedAmount}`;
}
