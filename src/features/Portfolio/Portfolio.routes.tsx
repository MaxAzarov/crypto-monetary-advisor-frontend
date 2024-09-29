import { Route, Routes } from "react-router-dom";
import { PortfolioScreen } from "./PortfolioScreen";
import { ProtectedRoute } from "../../routing/guards/ProtectedRoute";
import { GeneralLayout } from "../../components/Layout/GeneralLayout/GeneralLayout.component";

export function PortfolioRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <GeneralLayout>
                <PortfolioScreen />
              </GeneralLayout>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
