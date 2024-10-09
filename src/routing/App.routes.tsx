import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { PortfolioRoutes } from "../features/Portfolio/Portfolio.routes";
import { SignupRoutes } from "../features/Signup/Signup.routes";
import { LoginRoutes } from "../features/Login/Login.routes";
import { CryptoCurrenciesRoutes } from "../features/CryptoCurrencies/CryptoCurrencies.routes";
import { SetupRoutes } from "../features/Setup/Setup.routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={`${ROUTES.cryptocurrencies}/*`}
        element={<CryptoCurrenciesRoutes />}
      />
      <Route path={ROUTES.signup} element={<SignupRoutes />} />
      <Route path={ROUTES.login} element={<LoginRoutes />} />
      <Route path={ROUTES.portfolio} element={<PortfolioRoutes />} />
      <Route path={ROUTES.setup} element={<SetupRoutes />} />
    </Routes>
  );
}
