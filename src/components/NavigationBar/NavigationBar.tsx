import { Container } from "@material-ui/core";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { NavigationItemStyled } from "./NavigationBar.styled";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ROUTES } from "../../routing/routes";

export const NavigationBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              component="p"
              sx={{ padding: "10px 20px" }}
            >
              CryptoAdvisor
            </Typography>

            <NavLink
              to={ROUTES.cryptocurrencies}
              style={{ textDecoration: "none" }}
            >
              <NavigationItemStyled variant="h6">
                Cryptocurrencies
              </NavigationItemStyled>
            </NavLink>

            <NavLink to={ROUTES.portfolio} style={{ textDecoration: "none" }}>
              <NavigationItemStyled variant="h6">
                Portfolio
              </NavigationItemStyled>
            </NavLink>
          </Box>

          <AccountCircle />
        </Container>
      </Toolbar>
    </AppBar>
  );
};
