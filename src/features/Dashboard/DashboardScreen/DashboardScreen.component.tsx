import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routing/routes";

export function DashboardScreen() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to CryptoAdvisor
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your cryptocurrency portfolio effortlessly. Add wallets, track
          your assets, and get real-time insights on your holdings.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Wallet Management
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Add your wallets to your account and see your cryptocurrency
                balances in real-time.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(ROUTES.portfolio)}
              >
                Wallets
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Real-time Cryptocurrency Data
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Click on any cryptocurrency to view its live price and
                historical data.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(ROUTES.cryptocurrencies)}
              >
                View Cryptocurrencies
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
