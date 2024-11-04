import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatAddress } from "../../../helpers/formatAddress";
import { useAddWalletModal } from "../../../modals/wallets/AddWallet/AddWallet.hooks";
import { useViewWalletModal } from "../../../modals/wallets/ViewWallet/ViewWallet.hooks";
import {
  PortfolioItem,
  usePortfolio,
} from "../../../hooks/portfolio/usePortfolio";
import { WalletTable } from "../../../components/WalletTable";
import { MonobankTable } from "../../../components/MonobankTable";
import { ChatPopup } from "../../../components/ChatPopup";

export function PortfolioScreen() {
  const portfolio = usePortfolio();
  const { openAddWalletModal, closeAddWalletModal } = useAddWalletModal();
  const { openWalletBillModal } = useViewWalletModal();

  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] =
    useState<PortfolioItem | null>(null);

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
    setSelectedPortfolioItem(portfolio[newValue]);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    portfolioItem: PortfolioItem
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPortfolioItem(portfolioItem);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (portfolio.length > 0) {
      setSelectedPortfolioItem(portfolio[0]);
    }
  }, [portfolio]);

  const handleViewDetails = () => {
    if (selectedPortfolioItem && selectedPortfolioItem.type === "wallet") {
      openWalletBillModal({ id: selectedPortfolioItem.id });
    }
    handleMenuClose();
  };

  const renderComponent = () => {
    switch (selectedPortfolioItem?.type) {
      case "monobank":
        return <MonobankTable portfolioItem={selectedPortfolioItem} />;
      case "wallet":
        return <WalletTable portfolioItem={selectedPortfolioItem} />;
    }
  };

  return (
    <>
      <Box style={{ display: "flex", padding: "10px", height: "100%" }}>
        <Box style={{ flexBasis: "30%" }}>
          <Typography variant="h6" mt={2}>
            My portfolios{" "}
            {portfolio.length > 0 ? <>({portfolio.length})</> : <></>}
          </Typography>

          <Box>
            {portfolio.map((item, index) => (
              <Box
                key={index}
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
                  {item.type === "wallet"
                    ? formatAddress(item.accountAddress)
                    : item.monobankName}
                </Typography>
                <IconButton
                  onClick={(event) => handleMenuClick(event, item)}
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
          {portfolio.length > 0 && selectedPortfolioItem && (
            <>
              <Typography variant="h5" mt={2}>
                {selectedPortfolioItem.type === "wallet"
                  ? `Account address: ${selectedPortfolioItem.accountAddress}`
                  : `Monobank Account: ${selectedPortfolioItem.monobankName}`}
              </Typography>

              {renderComponent()}
            </>
          )}
        </Box>
      </Box>

      <ChatPopup />
    </>
  );
}
