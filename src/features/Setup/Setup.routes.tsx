import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../../routing/guards/ProtectedRoute";
import { GeneralLayout } from "../../components/Layout/GeneralLayout";
import { SetupScreen } from "./SetupScreen";

export function SetupRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <GeneralLayout>
                <SetupScreen />
              </GeneralLayout>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
