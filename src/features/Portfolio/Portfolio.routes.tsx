import { Route, Routes } from "react-router-dom";
import { PortfolioScreen } from "./PortfolioScreen";

export function PortfolioRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<PortfolioScreen />} />
      </Route>
    </Routes>
  );
}
