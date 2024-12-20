import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { ROUTES } from "../../routing/routes";
import { Api } from "../../api/backend/api";
import { APIErrorResponse } from "../../api/commonTypes/api";
import { useNotify } from "../../components/SnackbarAlert";
import {
  SignupRequest,
  SignupResponse,
} from "../../api/backend/auth/signUp/apiTypes";

export const useSignup = () => {
  const notify = useNotify();
  const navigate = useNavigate();

  const mutation = useMutation<
    SignupResponse,
    AxiosError<APIErrorResponse>,
    SignupRequest
  >(
    (data: SignupRequest) => {
      return Api.signup(data);
    },
    {
      onSuccess: async () => {
        navigate(ROUTES.login);
      },
      onError: () => {
        notify("error", "Invalid credentials");
      },
    }
  );

  return mutation;
};
