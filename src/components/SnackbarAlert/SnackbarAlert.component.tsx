import { Alert, Snackbar } from '@mui/material';
import { useRecoilState } from 'recoil';

import { snackbarAlertAtom } from './SnackbarAlert.state';

export function SnackbarAlert() {
  const [alertState, setAlertState] = useRecoilState(snackbarAlertAtom);

  const handleClose = () => {
    setAlertState({ open: false, message: '' });
  };

  return (
    <Snackbar
      open={alertState.open}
      autoHideDuration={alertState.hideAfterMs}
      onClose={handleClose}
      message={alertState.message}
    >
      {alertState.severity && (
        <Alert onClose={handleClose} severity={alertState.severity}>
          {alertState.message}
        </Alert>
      )}
    </Snackbar>
  );
}
