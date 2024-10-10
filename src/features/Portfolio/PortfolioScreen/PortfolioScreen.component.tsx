import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatAddress } from "../../../helpers/formatAddress";
import { useAddWalletModal } from "../../../modals/wallets/AddWallet/AddWallet.hooks";
import { useViewWalletModal } from "../../../modals/wallets/ViewWallet/ViewWallet.hooks";
import { Tokens, TOKENS } from "../../../constants/tokens";
import { useWallets } from "../../../hooks/wallets/useWallets";
import useContractPrices from "../../../hooks/prices/useContractPrices";
import useUserBalances from "../../../hooks/balances/useUserBalances";
import { useDeleteWallet } from "../../../hooks/wallets/useDeleteWallet";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routing/routes";

export function PortfolioScreen() {
  const { wallets } = useWallets({});
  const { openAddWalletModal, closeAddWalletModal } = useAddWalletModal();
  const { openWalletBillModal } = useViewWalletModal();
  const { mutate: deleteWallet } = useDeleteWallet();
  const { balances } = useUserBalances();
  const { prices } = useContractPrices();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWalletId, setSelectedWalletId] = useState<number | null>(null);

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    walletId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedWalletId(walletId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    const selectedWallet = wallets.find(
      (wallet) => wallet.id === selectedWalletId
    );

    if (selectedWallet) {
      openWalletBillModal({ id: selectedWallet.id });
    }
    handleMenuClose();
  };

  const handleRemoveWallet = async () => {
    if (selectedWalletId) {
      handleMenuClose();
      await deleteWallet({ id: selectedWalletId });
    }
  };

  return (
    <Box style={{ display: "flex", padding: "10px", height: "100%" }}>
      <Box style={{ flexBasis: "30%" }}>
        <Typography variant="h6" mt={2}>
          My portfolios {wallets.length > 0 ? <>({wallets.length})</> : <></>}
        </Typography>

        <Box>
          {wallets.map((wallet, index) => (
            <Box
              key={wallet.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
              p={1}
              style={{
                backgroundColor:
                  selectedTab === index ? "#e0e0e0" : "transparent",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => handleTabChange(index)}
            >
              <Typography ml={2}>
                {formatAddress(wallet.accountAddress)}
              </Typography>
              <IconButton
                onClick={(event) => handleMenuClick(event, wallet.id)}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleViewDetails}>View Wallet Details</MenuItem>
          <MenuItem onClick={handleRemoveWallet}>Remove Wallet</MenuItem>
        </Menu>

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
                        <TableRow
                          key={token}
                          onClick={() => {
                            navigate(
                              ROUTES.cryptocurrencyDetails.replace(
                                ":symbol",
                                token
                              )
                            );
                          }}
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
