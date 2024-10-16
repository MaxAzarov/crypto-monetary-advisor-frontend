import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useNotify } from "../../components/SnackbarAlert";
import { APIErrorResponse } from "../../api/commonTypes/api";
import { Api } from "../../api/backend/api";
import {
  AddMonobankClientRequest,
  AddMonobankClientResponse,
} from "../../api/backend/monobankClients/addMonobankClient/apiTypes";
import { cacheKeys } from "./monobankClient.cacheKeys";

export const useAddMonobankClient = () => {
  const notify = useNotify();
  const queryclient = useQueryClient();

  const mutation = useMutation<
    AddMonobankClientResponse,
    AxiosError<APIErrorResponse>,
    AddMonobankClientRequest
  >(
    (data: AddMonobankClientRequest) => {
      return Api.addMonobankClient(data);
    },
    {
      onSuccess: async () => {
        queryclient.invalidateQueries(cacheKeys.getMonobankClients());
        notify("success", "New monobank client is added");
      },
      onError: () => {
        notify("error", "Can not add a new monobank client");
      },
    }
  );

  return mutation;
};
