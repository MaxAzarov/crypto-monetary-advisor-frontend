/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { SubmitButtonStyled } from "./SubmitButton.styles";
import { RightArrow } from "../../icons";

interface SubmitButtonProps extends ButtonProps {}

export function SubmitButton({
  ...props
}: PropsWithChildren<SubmitButtonProps>) {
  return (
    <SubmitButtonStyled
      size="large"
      type="submit"
      endIcon={<RightArrow />}
      {...props}
    />
  );
}
