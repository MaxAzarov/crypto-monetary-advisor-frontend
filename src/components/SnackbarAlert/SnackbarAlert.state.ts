import { atom } from 'recoil';

import { AlertColor } from '@mui/material';
import React from 'react';

export interface SnackbarAlertState {
  open: boolean;
  message: React.ReactNode;
  severity?: AlertColor;
  hideAfterMs?: number;
}

export const snackbarAlertAtom = atom<SnackbarAlertState>({
  key: 'snackbarAlertAtom',
  default: { open: false, message: '' },
});
