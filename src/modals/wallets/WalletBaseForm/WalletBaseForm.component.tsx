/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useFormikContext } from "formik";

import { InputsGrid, Section } from "./WalletBaseForm.style";
import { WalletBaseForm } from "./WalletBaseForm.types";
import { FormikTextField } from "../../../components/form/FormikTextField.component";

export interface AddWalletBaseFormProps {}

export function AddWalletBaseForm({}: AddWalletBaseFormProps) {
  const form = useFormikContext<WalletBaseForm>();

  return (
    <Section>
      <InputsGrid>
        <FormikTextField
          formik={form}
          label="Wallet Name"
          name="walletName"
          required
          fullWidth
        />
      </InputsGrid>

      <InputsGrid>
        <FormikTextField
          formik={form}
          // type="string"
          label="Wallet Address"
          name="accountAddress"
          required
          fullWidth
        />
      </InputsGrid>
    </Section>
  );
}
