import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { PortfolioRoutes } from "../features/Portfolio/Portfolio.routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.cryptocurrencies} element={<div></div>} />
      <Route path={ROUTES.exchanges} element={<div></div>} />
      <Route path={ROUTES.portfolio} element={<PortfolioRoutes />} />
    </Routes>
  );
}
