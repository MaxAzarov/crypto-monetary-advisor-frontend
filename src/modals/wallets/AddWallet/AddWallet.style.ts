import { Box, Dialog, styled } from "@mui/material";

export const DialogStyled = styled(Dialog)`
  & .MuiDialog-paper {
    min-width: 600px;
    overflow-y: auto;
    padding: ${(props) => props.theme.spacing(10, 0)};
  }
`;

export const Section = styled(Box)`
  padding: ${(props) => props.theme.spacing(10, 35)};
`;

export const InputsGrid = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${(props) => props.theme.spacing(16)};
  row-gap: ${(props) => props.theme.spacing(8)};
`;
