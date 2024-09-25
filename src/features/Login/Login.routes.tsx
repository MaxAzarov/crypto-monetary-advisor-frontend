import { Routes, Route } from "react-router-dom";
import Login from "./Login.page";
import LoginScreen from "./LoginScreen/LoginScreen.component";

export function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        <Route index element={<LoginScreen />} />
      </Route>
    </Routes>
  );
}
