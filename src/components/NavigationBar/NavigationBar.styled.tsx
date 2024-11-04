import { styled, Typography } from "@mui/material";
import { Container, Box } from "@mui/material";

export const NavigationItemStyled = styled(Typography)`
  padding: 10px;
  color: ${(props) => props.theme.palette.common.white};
`;

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLinksBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
