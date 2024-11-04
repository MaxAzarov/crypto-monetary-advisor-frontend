import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ROUTES } from "../../routing/routes";
import {
  StyledContainer,
  NavLinksBox,
  NavigationItemStyled,
} from "./NavigationBar.styles";
import { appStorage } from "../../services/appStorage";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    appStorage.clearUserData();

    navigate(ROUTES.login);

    setOpen(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <StyledContainer>
          <NavLinksBox>
            <NavLink
              to={ROUTES.dashboard}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{ padding: "10px 20px" }}
              >
                CryptoAdvisor
              </Typography>
            </NavLink>

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
          </NavLinksBox>

          <AccountCircle
            onClick={handleClickOpen}
            style={{ cursor: "pointer" }}
          />
        </StyledContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogout} color="primary">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};
