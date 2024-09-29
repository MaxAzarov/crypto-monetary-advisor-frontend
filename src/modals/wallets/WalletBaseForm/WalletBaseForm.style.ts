import { Box, styled } from "@mui/material";

export const Section = styled(Box)`
  padding: ${(props) => props.theme.spacing(10, 25)};
`;

export const InputsGrid = styled("div")`
  display: grid;
  column-gap: ${(props) => props.theme.spacing(16)};
  row-gap: ${(props) => props.theme.spacing(8)};
`;
