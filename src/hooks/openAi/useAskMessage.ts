import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { Api } from "../../api/backend/api";
import { APIErrorResponse } from "../../api/commonTypes/api";
import { useNotify } from "../../components/SnackbarAlert";
import {
  AskMessageRequest,
  AskMessageResponse,
} from "../../api/backend/openai/askMessage/apiTypes";

export const useAskMessage = () => {
  const notify = useNotify();

  const mutation = useMutation<
    AskMessageResponse,
    AxiosError<APIErrorResponse>,
    AskMessageRequest
  >(
    (data: AskMessageRequest) => {
      return Api.askMessage(data);
    },
    {
      onSuccess: async () => {},
      onError: () => {
        notify("error", "Can not send a message");
      },
    }
  );

  return mutation;
};
