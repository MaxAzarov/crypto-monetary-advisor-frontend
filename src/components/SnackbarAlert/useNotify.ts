import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { snackbarAlertAtom, SnackbarAlertState } from './SnackbarAlert.state';

export function useNotify() {
  const setAlertState = useSetRecoilState(snackbarAlertAtom);

  const handler = useCallback(
    (
      severity: SnackbarAlertState['severity'],
      message: SnackbarAlertState['message'],
    ) => {
      setAlertState({ open: true, hideAfterMs: 5000, message, severity });
    },
    [setAlertState],
  );

  return handler;
}
