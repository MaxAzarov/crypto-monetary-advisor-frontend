/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { ethers } from "ethers";

export const addWalletFormSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(["wallet", "monobank"], "Invalid wallet type")
    .required("Wallet type is required"),

  accountAddress: Yup.string().when("walletType", (walletType: any, schema) => {
    return walletType === "wallet"
      ? schema
          .test("is-valid-address", "Account address is invalid", (value) =>
            value ? ethers.isAddress(value) : false
          )
          .required("Account address is required")
      : schema.notRequired();
  }),

  walletName: Yup.string().when("walletType", (walletType: any, schema) => {
    return walletType === "wallet"
      ? schema
          .min(2, "Wallet name must be at least 2 characters long")
          .required("Wallet name is required")
      : schema.notRequired();
  }),

  monobankKey: Yup.string().when("walletType", (walletType: any, schema) => {
    return walletType === "monobank"
      ? schema
          .min(10, "Monobank key must be at least 10 characters long")
          .required("Monobank key is required")
      : schema.notRequired();
  }),

  monobankName: Yup.string().when("walletType", (walletType: any, schema) => {
    return walletType === "monobank"
      ? schema
          .min(2, "Monobank name must be at least 2 characters long")
          .required("Monobank name is required")
      : schema.notRequired();
  }),
});
