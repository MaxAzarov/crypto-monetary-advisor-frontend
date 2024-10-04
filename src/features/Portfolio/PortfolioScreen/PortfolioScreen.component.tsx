import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { formatAddress } from "../../../helpers/formatAddress";
import { useAddWalletModal } from "../../../modals/wallets/AddWallet/AddWallet.hooks";
import { useViewWalletModal } from "../../../modals/wallets/ViewWallet/ViewWallet.hooks";
import { Tokens, tokens } from "../../../constants/tokens";
import { useWallets } from "../../../hooks/wallets/useWallets";
import useContractPrices from "../../../hooks/prices/useContractPrices";
import useUserBalances from "../../../hooks/balances/useUserBalances";

export function PortfolioScreen() {
  const { wallets } = useWallets({});
  const { openAddWalletModal, closeAddWalletModal } = useAddWalletModal();
  const { openWalletBillModal } = useViewWalletModal();
  const { balances } = useUserBalances();
  const { prices } = useContractPrices();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box style={{ display: "flex", padding: "10px", height: "100%" }}>
      <Box style={{ flexBasis: "30%" }}>
        <Typography variant="h6" mt={2}>
          My portfolios {wallets.length > 0 ? <>({wallets.length})</> : <></>}
        </Typography>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          orientation="vertical"
        >
          {wallets.map((wallet) => (
            <Tab
              onClick={() => openWalletBillModal({ id: wallet.id })}
              key={wallet.id}
              label={formatAddress(wallet.accountAddress)}
            />
          ))}
        </Tabs>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() =>
            openAddWalletModal({
              onSuccess: () => {
                closeAddWalletModal();
              },
            })
          }
          style={{ marginTop: "20px" }}
        >
          Create portfolio
        </Button>
      </Box>

      <Box
        style={{
          flexBasis: "70%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        {wallets.length > 0 && (
          <>
            <Typography variant="h5" mt={2}>
              Account address: {wallets[selectedTab].accountAddress}
            </Typography>
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
                    {balances?.[wallets[selectedTab].accountAddress] &&
                      Object.entries(
                        balances[wallets[selectedTab].accountAddress]
                      ).map(([token, balance]) => (
                        <TableRow key={token}>
                          <TableCell>
                            <Avatar
                              alt={tokens[token]?.name}
                              src={tokens[token]?.icon}
                              style={{ marginRight: 8 }}
                            />
                            {tokens[token]?.name || token}
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
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
