import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNotify } from "../../components/SnackbarAlert";
import { Api } from "../../api/api";
import { cacheKeys } from "./wallets.cacheKeys";
import {
  DeleteWalletRequest,
  DeleteWalletResponse,
} from "../../api/wallets/deleteWallet/apiTypes";
import { APIErrorResponse } from "../../api/commonTypes/api";

export const useDeleteWallet = () => {
  const notify = useNotify();
  const queryclient = useQueryClient();

  const mutation = useMutation<
    DeleteWalletResponse,
    AxiosError<APIErrorResponse>,
    DeleteWalletRequest
  >(
    async (data) => {
      const response = await Api.deleteWallet(data);

      queryclient.invalidateQueries(cacheKeys.getWallets());

      return response;
    },
    {
      onSuccess: async () => {
        notify("success", "Wallet is successfully deleted");
      },
      onError: async (err) => {
        notify(
          "error",
          `Failed to delete wallet: ${
            err.response?.data.message || err.message
          }`
        );
      },
    }
  );

  return mutation;
};
