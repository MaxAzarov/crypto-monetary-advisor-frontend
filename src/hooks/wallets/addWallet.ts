import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useNotify } from "../../components/SnackbarAlert";
import { APIErrorResponse } from "../../api/commonTypes/api";
import { cacheKeys } from "./wallets.cacheKeys";
import { Api } from "../../api/backend/api";
import {
  AddWalletRequest,
  AddWalletResponse,
} from "../../api/backend/wallets/addWallet/apiTypes";

export const useAddWallet = () => {
  const notify = useNotify();
  const queryclient = useQueryClient();

  const mutation = useMutation<
    AddWalletResponse,
    AxiosError<APIErrorResponse>,
    AddWalletRequest
  >(
    (data: AddWalletRequest) => {
      return Api.addWallet(data);
    },
    {
      onSuccess: async () => {
        queryclient.invalidateQueries(cacheKeys.getWallets());
        notify("success", "New wallet is added");
      },
      onError: () => {
        notify("error", "Can not add a new wallet");
      },
    }
  );

  return mutation;
};
