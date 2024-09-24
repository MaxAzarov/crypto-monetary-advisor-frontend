import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { theme } from "./theme";
import { AppRoutes } from "./routing/App.routes";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationBar />

        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
