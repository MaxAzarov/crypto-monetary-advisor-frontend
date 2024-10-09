import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { theme } from "./theme";
import { AppRoutes } from "./routing/App.routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

const MAX_SNACK = 15;

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const tssCache = createCache({
  key: "tss",
});

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <CacheProvider value={muiCache}>
          <TssCacheProvider value={tssCache}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={MAX_SNACK}>
                  <CssBaseline />
                  <NavigationBar />

                  <AppRoutes />
                </SnackbarProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </TssCacheProvider>
        </CacheProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
