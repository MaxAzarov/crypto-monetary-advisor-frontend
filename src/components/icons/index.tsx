import { SvgIcon, SvgIconProps } from "@mui/material";

export type IconProps = SvgIconProps;

export function RightArrow(props: IconProps) {
  return (
    <SvgIcon
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5305 11.752H5.38354"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3682 8.5L13.5303 11.752L10.3682 15"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export function BackArrowDark(props: IconProps) {
  return (
    <SvgIcon
      width="9"
      height="7"
      viewBox="0 0 9 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.09897 6.72998L0.297851 4.0984L0.297851 3.36156L3.09897 0.72998L3.89449 1.46682L2.05695 3.20366L8.29785 3.20366L8.29785 4.2563L2.05695 4.2563L3.90569 5.99314L3.09897 6.72998Z"
        fill="#7583AA"
      />
    </SvgIcon>
  );
}
