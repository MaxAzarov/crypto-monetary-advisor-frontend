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

export function PortfolioScreen() {
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
            My portfolios (3)
          </Typography>
          <List>
            <ListItem component="div">
              <ListItemIcon>
                <AccountBalanceWallet />
              </ListItemIcon>
              <ListItemText primary="0x55...00c2" />
              <Typography variant="caption">$0</Typography>
            </ListItem>
            <ListItem component="div">
              <ListItemIcon>
                <AccountBalanceWallet />
              </ListItemIcon>
              <ListItemText primary="test" />
              <Typography variant="caption">$0</Typography>
            </ListItem>
            <ListItem component="div">
              <ListItemIcon>
                <AccountBalanceWallet />
              </ListItemIcon>
              <ListItemText primary="Binance Portfolio" />
              <Typography variant="caption">$61.83</Typography>
            </ListItem>
          </List>
          <Button variant="contained" color="primary" fullWidth>
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
