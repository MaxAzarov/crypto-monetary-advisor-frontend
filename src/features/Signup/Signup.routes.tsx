import { Routes, Route } from "react-router-dom";
import { SignupScreen } from "./SignupScreen";
import Signup from "./Signup.page";

export function SignupRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Signup />}>
        <Route index element={<SignupScreen />} />
      </Route>
    </Routes>
  );
}
