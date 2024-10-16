import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Divider,
} from "@mui/material";
import { formatPrice } from "../../helpers/formatPrice";
import { Monobank } from "../../hooks/portfolio/usePortfolio";
import { useClientInfo } from "../../hooks/monobankClient/useClientInfo";

interface MonobankTableProps {
  portfolioItem: Monobank;
}

export function MonobankTable({ portfolioItem }: MonobankTableProps) {
  const { clientInfo: clientData, isLoading } = useClientInfo(
    {
      id: portfolioItem.id!,
    },
    { enabled: !!portfolioItem.id }
  );

  if (!clientData || isLoading) {
    return;
  }

  return (
    <Box
      style={{
        flexBasis: "70%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginLeft: "20px",
      }}
    >
      {clientData.accounts.length > 0 && (
        <>
          <Typography variant="h5" mt={2}>
            Account Details
          </Typography>
          <Box mt={2} width="100%">
            <TableContainer
              component={Paper}
              style={{ boxShadow: "none", backgroundColor: "transparent" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>IBAN</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Currency</TableCell>
                    {clientData.accounts.some(
                      (account) => account.type === "monobank"
                    ) && <TableCell>Credit Limit</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientData.accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.iban}</TableCell>
                      <TableCell>{account.type}</TableCell>
                      <TableCell>
                        {formatPrice(account.balance, account.currencyCode)}
                      </TableCell>
                      <TableCell>{account.currencyCode}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {clientData.jars.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6">Savings Jars</Typography>
              <TableContainer
                component={Paper}
                style={{ boxShadow: "none", backgroundColor: "transparent" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Balance</TableCell>
                      <TableCell>Currency</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientData.jars.map((jar) => (
                      <TableRow key={jar.id}>
                        <TableCell>{jar.title}</TableCell>
                        <TableCell>{jar.balance}</TableCell>
                        <TableCell>{jar.currencyCode}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </Box>
  );
}
