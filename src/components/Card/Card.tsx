import * as React from "react";
import { Container, Label, Root } from "./Card.styles";

interface ICardProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card = ({
  children = null,
  className,
  style,
  label,
}: ICardProps) => {
  return (
    <Root className={className} style={style}>
      {!!label && <Label>{label}</Label>}
      <Container>{children}</Container>
    </Root>
  );
};
