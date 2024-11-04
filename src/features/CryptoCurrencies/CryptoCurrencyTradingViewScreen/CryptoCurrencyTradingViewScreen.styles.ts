import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const RootBox = styled(Box)({
  width: "100%",
  display: "flex",
  padding: "10px",
  alignItems: "center",
  justifyContent: "center",
});

export const ContainerBox = styled(Box)({
  height: "calc(100vh - 80px)",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
});

export const AdjustBox = styled("div")({
  flex: 1,
});
