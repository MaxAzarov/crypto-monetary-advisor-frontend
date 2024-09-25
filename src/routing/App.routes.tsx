import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { PortfolioRoutes } from "../features/Portfolio/Portfolio.routes";
import { SignupRoutes } from "../features/Signup/Signup.routes";
import { LoginRoutes } from "../features/Login/Login.routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.cryptocurrencies} element={<div></div>} />
      <Route path={ROUTES.exchanges} element={<div></div>} />
      <Route path={ROUTES.signup} element={<SignupRoutes />} />
      <Route path={ROUTES.login} element={<LoginRoutes />} />
      <Route path={ROUTES.portfolio} element={<PortfolioRoutes />} />
    </Routes>
  );
}
