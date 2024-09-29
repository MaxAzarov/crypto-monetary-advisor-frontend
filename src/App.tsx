import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { theme } from "./theme";
import { AppRoutes } from "./routing/App.routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavigationBar />

            <AppRoutes />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
