import { FormikProvider, useFormik } from "formik";
import { useRecoilState } from "recoil";
import { Button, Divider, Typography } from "@mui/material";

import { DialogStyled, Section } from "./AddWallet.style";
import { addWalletModalStateAtom } from "./AddWallet.state";
import { AddWalletForm } from "./AddWallet.types";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { addWalletFormSchema } from "./AddWallet.schema";
import { BackButton } from "../../../components/Buttons/BackButton";
import { AddWalletBaseForm } from "../WalletBaseForm/WalletBaseForm.component";
import { useAddWallet } from "../../../hooks/wallets/addWallet";

const defaultWallet: AddWalletForm = {
  accountAddress: "",
  walletName: "",
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
      await addWallet(values);
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
          <Typography variant="h6">Add wallet</Typography>
        </Section>

        <FormikProvider value={form}>
          <AddWalletBaseForm />
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
