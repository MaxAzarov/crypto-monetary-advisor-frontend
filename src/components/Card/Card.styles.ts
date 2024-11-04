import { alpha, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const Root = styled(Paper)({
  position: "relative",
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const Container = styled("div")({
  position: "absolute",
  top: 35,
  left: 0,
  right: 0,
  bottom: 0,
  height: "calc(100% - 35px)",
  padding: 5,
  width: "100%",
  background: alpha("#000", 0.2),
  overflow: "scroll",
});

export const Label = styled(Typography)({
  height: "35px",
  display: "flex",
  alignItems: "center",
  marginLeft: "6px",
  opacity: 0.5,
});
