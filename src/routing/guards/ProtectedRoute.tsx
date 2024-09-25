import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

import { ROUTES } from "../routes";
import { HttpStatusCode } from "axios";
import { useCurrentUser } from "../../hooks/auth/useCurrentUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { error, isLoading } = useCurrentUser();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    if (error?.response?.data.statusCode === HttpStatusCode.Unauthorized) {
      return <Navigate to={ROUTES.login} />;
    }

    console.error(`[useCurrentUser] Error: ${error}`);
    return (
      <Typography>Internal server error. Please, refresh the page</Typography>
    );
  }

  return <>{children}</>;
}
