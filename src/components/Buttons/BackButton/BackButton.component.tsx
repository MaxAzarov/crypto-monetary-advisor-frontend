import { Typography, ButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackArrowDarkStyled, BackButtonStyled } from './BackButton.styles';

interface BackButtonProps extends ButtonProps {}

export function BackButton({
  onClick,
  children,
  ...props
}: PropsWithChildren<BackButtonProps>) {
  const navigate = useNavigate();

  return (
    <BackButtonStyled
      variant="text"
      size="small"
      startIcon={<BackArrowDarkStyled />}
      onClick={(e) => (onClick ? onClick(e) : navigate(-1))}
      {...props}
    >
      {typeof children === 'string' ? (
        <Typography variant="caption">{children}</Typography>
      ) : (
        children || <Typography variant="caption">Back</Typography>
      )}
    </BackButtonStyled>
  );
}
