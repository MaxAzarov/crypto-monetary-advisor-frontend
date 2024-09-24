import { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routing/routes";
import { appStorage } from "../../services/appStorage";

export const useSignout = () => {
  const navigate = useNavigate();

  const signout = useCallback(async () => {
    await appStorage.removeApiToken();
    navigate(ROUTES.login);
  }, [navigate]);

  return { signout };
};
