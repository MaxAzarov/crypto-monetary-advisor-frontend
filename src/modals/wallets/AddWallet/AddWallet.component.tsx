import { FormikProvider, useFormik } from "formik";
import { useRecoilState } from "recoil";
import {
  Button,
  Divider,
  Typography,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { DialogStyled, Section } from "./AddWallet.style";
import { addWalletModalStateAtom } from "./AddWallet.state";
import { AddWalletForm } from "./AddWallet.types";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { addWalletFormSchema } from "./AddWallet.schema";
import { BackButton } from "../../../components/Buttons/BackButton";
import { AddWalletBaseForm } from "../WalletBaseForm/WalletBaseForm.component";
import { useAddWallet } from "../../../hooks/wallets/addWallet";
import { appStorage } from "../../../services/appStorage";

const defaultWallet: AddWalletForm = {
  accountAddress: "",
  walletName: "",
  type: "wallet",
  monobankKey: "",
  monobankName: "",
};

export function AddWalletModal() {
  const [modalState, setModalState] = useRecoilState(addWalletModalStateAtom);
  const { mutate: addWallet } = useAddWallet();

  const form = useFormik<AddWalletForm>({
    initialValues: { ...defaultWallet, ...modalState.initialFields },
    enableReinitialize: true,
    validationSchema: addWalletFormSchema,
    validateOnChange: false,
    async onSubmit(values) {
      if (values.type === "wallet") {
        await addWallet({
          accountAddress: values.accountAddress,
          walletName: values.walletName,
        });
      } else if (values.type === "monobank") {
        await appStorage.addWallet({
          monobankKey: values.monobankKey,
          monobankName: values.monobankName,
        });
      }

      modalState.onSuccess?.();
      form.resetForm();
    },
  });

  const handleClose = () => {
    setModalState({ open: false });
  };

  if (!form.values) {
    return null;
  }

  return (
    <DialogStyled open={modalState.open} onClose={handleClose}>
      <form onSubmit={form.handleSubmit}>
        <Section sx={{ pb: 0 }}>
          <BackButton onClick={handleClose} />
          <Typography variant="h6">Add Wallet or Monobank Account</Typography>
        </Section>

        <FormikProvider value={form}>
          <Section>
            <Typography variant="body1">Choose Account Type</Typography>
            <Select
              name="type"
              value={form.values.type}
              onChange={form.handleChange}
              fullWidth
            >
              <MenuItem value="wallet">Wallet</MenuItem>
              <MenuItem value="monobank">Monobank</MenuItem>
            </Select>
          </Section>

          {form.values.type === "wallet" ? (
            <AddWalletBaseForm />
          ) : (
            <Section>
              <TextField
                label="Monobank Key"
                name="monobankKey"
                value={form.values.monobankKey}
                onChange={form.handleChange}
                fullWidth
              />
              <TextField
                label="Monobank Name"
                name="monobankName"
                value={form.values.monobankName}
                onChange={form.handleChange}
                fullWidth
                sx={{ mt: 2 }}
              />
            </Section>
          )}
        </FormikProvider>

        <Divider />

        <Section display="flex" justifyContent="space-between">
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <SubmitButton disabled={form.isSubmitting}>Create</SubmitButton>
        </Section>
      </form>
    </DialogStyled>
  );
}
