import * as Yup from "yup";
import { ethers } from "ethers";

export const addWalletFormSchema = Yup.object({
  accountAddress: Yup.string()
    .test("is-valid-address", "Account address is invalid", (value) =>
      value ? ethers.isAddress(value) : false
    )
    .required("Account address is required"),
  walletName: Yup.string()
    .min(2, "Wallet name must be at least 2 characters long")
    .required("Wallet name is required"),
}).required();
