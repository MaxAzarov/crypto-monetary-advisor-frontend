export interface AddWalletForm {
  accountAddress: string;
  walletName: string;
}

type AddWalletModalStateBase = {
  open: boolean;
  initialFields?: Partial<AddWalletForm> & { purchaseOrderId?: string };
  canEdit?: Partial<Record<keyof AddWalletForm, boolean>>;
  onSuccess?: () => unknown;
};

export type AddWalletModalState = AddWalletModalStateBase;