import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Home, AccountBalanceWallet } from "@mui/icons-material";
import { useWallets } from "../../../hooks/wallets/useWallets";
import { formatAddress } from "../../../helpers/formatAddress";
import { useAddWalletModal } from "../../../modals/wallets/AddWallet/AddWallet.hooks";
import { useViewWalletModal } from "../../../modals/wallets/ViewWallet/ViewWallet.hooks";

export function PortfolioScreen() {
  const { wallets } = useWallets({});
  const { openAddWalletModal, closeAddWalletModal } = useAddWalletModal();
  const { openWalletBillModal } = useViewWalletModal();

  return (
    <Box style={{ display: "flex", padding: "10px", height: "100%" }}>
      <Box style={{ flexBasis: "30%" }}>
        <Box>
          <ListItem component="div">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Overview" />
            <Typography variant="caption">$61.83</Typography>
          </ListItem>
          <Typography variant="h6" mt={2}>
            My portfolios {wallets.length > 0 ? <>({wallets.length})</> : <></>}
          </Typography>
          <List>
            {wallets.map((wallet) => (
              <ListItem
                component="div"
                key={wallet.id}
                onClick={() => openWalletBillModal({ id: wallet.id })}
              >
                <ListItemIcon>
                  <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText primary={formatAddress(wallet.accountAddress)} />
                <Typography variant="caption">$0</Typography>
              </ListItem>
            ))}
          </List>
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
          >
            Create portfolio
          </Button>
        </Box>
      </Box>
      <Box
        style={{
          flexBasis: "70%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" mt={2}>
          Portfolio sync in progress
        </Typography>
        <Typography variant="body2" mt={1}>
          We are importing your data. Please come back again in a few moments.
        </Typography>
      </Box>
    </Box>
  );
}
