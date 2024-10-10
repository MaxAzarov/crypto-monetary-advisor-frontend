import { Route, Routes } from "react-router-dom";
import { GeneralLayout } from "../../components/Layout/GeneralLayout/GeneralLayout.component";
import { DashboardScreen } from "./DashboardScreen/DashboardScreen.component";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <GeneralLayout>
              <DashboardScreen />
            </GeneralLayout>
          }
        />
      </Route>
    </Routes>
  );
}
