import {
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { Tokens, TOKENS } from "../../constants/tokens";
import { useNavigate } from "react-router-dom";
import useUserBalances from "../../hooks/balances/useUserBalances";
import useContractPrices from "../../hooks/prices/useContractPrices";
import { ROUTES } from "../../routing/routes";
import { CryptoWallet } from "../../hooks/portfolio/usePortfolio";

interface WalletTableProps {
  portfolioItem: CryptoWallet;
}

export function WalletTable({ portfolioItem }: WalletTableProps) {
  const { balances } = useUserBalances();
  const { prices } = useContractPrices();
  const navigate = useNavigate();

  return (
    <Box mt={2} width="100%">
      <TableContainer
        component={Paper}
        style={{ boxShadow: "none", backgroundColor: "transparent" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Price (USD)</TableCell>
              <TableCell>Value (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balances?.[portfolioItem.accountAddress] &&
              Object.entries(balances[portfolioItem.accountAddress]).map(
                ([token, balance]) => (
                  <TableRow
                    key={token}
                    onClick={() =>
                      navigate(
                        ROUTES.cryptocurrencyDetails.replace(":symbol", token)
                      )
                    }
                  >
                    <TableCell>
                      <Avatar
                        alt={TOKENS[token]?.name}
                        src={TOKENS[token]?.icon}
                        style={{ marginRight: 8 }}
                      />
                      {TOKENS[token]?.name || token}
                    </TableCell>
                    <TableCell>{balance}</TableCell>
                    <TableCell>
                      {prices[token as Tokens]
                        ? `$${prices[token as Tokens]}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {prices[token as Tokens]
                        ? `$${(
                            parseFloat(balance) * prices[token as Tokens]
                          ).toFixed(2)}`
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
