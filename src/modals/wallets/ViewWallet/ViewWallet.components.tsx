import { useRecoilState } from "recoil";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { DialogStyled, Section } from "./ViewWallet.style";
import { BackButton } from "../../../components/Buttons/BackButton";
import { viewWalletModalStateAtom } from "./ViewWallet.state";
import DeleteIcon from "@mui/icons-material/Delete";
import { useWallet } from "../../../hooks/wallets/useWallet";
import { useDeleteWallet } from "../../../hooks/wallets/useDeleteWallet";

export function ViewWalletModal() {
  const [modalState, setModalState] = useRecoilState(viewWalletModalStateAtom);
  const { mutate: deleteWallet } = useDeleteWallet();

  const walletId = modalState.id;

  const { wallet, isLoading } = useWallet(
    { id: modalState.id },
    { enabled: !!walletId }
  );

  const handleClose = () => {
    setModalState({ open: false });
  };

  const onDelete = async () => {
    await deleteWallet({ id: walletId });
  };

  if (!wallet || isLoading) {
    return null;
  }

  return (
    <DialogStyled open={modalState.open} onClose={handleClose}>
      <Section>
        <Box>
          <Container
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <BackButton onClick={handleClose} />
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Delete
            </Button>
          </Container>

          <Typography variant="h6">Wallet name: {wallet.walletName}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">
            Account address: {wallet.walletName}
          </Typography>
        </Box>
      </Section>

      <Divider />
    </DialogStyled>
  );
}
