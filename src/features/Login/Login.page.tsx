import { Outlet } from "react-router-dom";
import { UnauthorizedLayout } from "../../components/Layout/UnauthorizedLayout/UnauthorizedLayout.component";

export default function Login() {
  return (
    <UnauthorizedLayout>
      <Outlet />
    </UnauthorizedLayout>
  );
}
