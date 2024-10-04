import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { useNavigate } from "react-router-dom";
import { useNotify } from "../../components/SnackbarAlert";
import { LoginRequest, LoginResponse } from "../../api/auth/login/apiTypes";
import { APIErrorResponse } from "../../api/commonTypes/api";
import { appStorage } from "../../services/appStorage";
import { ROUTES } from "../../routing/routes";
import { Api } from "../../api/backend/api";

export const useLogin = () => {
  const notify = useNotify();
  const navigate = useNavigate();

  const mutation = useMutation<
    LoginResponse,
    AxiosError<APIErrorResponse>,
    LoginRequest
  >(
    (data: LoginRequest) => {
      return Api.login(data);
    },
    {
      onSuccess: async ({ jwtToken }) => {
        await appStorage.setApiToken(jwtToken);

        navigate(ROUTES.main);
      },
      onError: () => {
        notify("error", "Invalid credentials");
      },
    }
  );

  return mutation;
};
