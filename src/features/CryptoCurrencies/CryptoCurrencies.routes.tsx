import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../../routing/guards/ProtectedRoute";
import { GeneralLayout } from "../../components/Layout/GeneralLayout/GeneralLayout.component";
import { CryptoCurrenciesScreen } from "./CryptoCurrenciesScreen";

export function CryptoCurrenciesRoutes() {
  return (
    <Routes>
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
