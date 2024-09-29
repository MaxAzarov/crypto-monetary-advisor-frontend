import { Box, Dialog, styled } from "@mui/material";

export const DialogStyled = styled(Dialog)`
  & .MuiDialog-paper {
    min-width: 700px;
    overflow-y: auto;
    padding: ${(props) => props.theme.spacing(10, 0)};
  }
`;

export const Section = styled(Box)`
  padding: ${(props) => props.theme.spacing(10, 35)};
`;
