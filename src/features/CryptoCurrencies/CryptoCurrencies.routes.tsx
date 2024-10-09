import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../../routing/guards/ProtectedRoute";
import { GeneralLayout } from "../../components/Layout/GeneralLayout/GeneralLayout.component";
import { CryptoCurrenciesScreen } from "./CryptoCurrenciesScreen";
import { CryptoCurrencyTradingViewScreen } from "./CryptoCurrencyTradingViewScreen";

export function CryptoCurrenciesRoutes() {
  return (
    <Routes>
      <Route path="/:symbol">
        <Route
          index
          element={
            <ProtectedRoute>
              <GeneralLayout>
                <CryptoCurrencyTradingViewScreen />
              </GeneralLayout>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <GeneralLayout>
                <CryptoCurrenciesScreen />
              </GeneralLayout>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
