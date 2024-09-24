import { createTheme } from "@mui/material";
import { css, GlobalStyles as MUIGlobalStyles } from "@mui/material";
import { grey } from "@mui/material/colors";

// eslint-disable-next-line react-refresh/only-export-components
export const COLORS = {
  APP_BLUE: "#125992",
  APP_GREEN: "#57A849",
  APP_RED: "#EB5757",
  APP_BLUE_LIGHT: "#187CB3",
  APP_BLUE_DARK: "#195E95",
  APP_SECONDARY_MAIN: "#303E65",
  APP_SECONDARY_LIGHT: "#D1E5F0",
  TEXT_PRIMARY: "#303E65",
  TEXT_SECONDARY: "#7583AA",
  TEXT_LIGHT_BLUE: "#096DA5",
  INPUT_PLACEHOLDER: "#7583AA",
  INPUT_BACKGROUND_GREY: "#F8FAFF",
  WHITE: "#fff",
  PRIMARY_400: "#48B6F3",
  PRIMARY_50: "#ECEFF7",
  BORDER_COLOR: "#E5EAF5",
};

const GRADIENTS = {
  MAIN: `linear-gradient(180deg, ${COLORS.APP_BLUE_DARK} 0%, ${COLORS.APP_BLUE_LIGHT} 100%)`,
};

export const TOPBAR_HEIGHT = 80;

const BACKGROUNDS = {
  BUTTON_LINEAR: GRADIENTS.MAIN,
  BUTTON: COLORS.APP_BLUE,
};

const SHADOWS = {
  INPUT:
    "inset 0px 1px 2px rgba(0, 0, 0, 0.05), inset 0px 5px 20px rgba(0, 0, 0, 0.03)",
  BUTTON: "0px 6px 12px rgba(0, 0, 0, 0.03)",
  TOP_BLOCK: "0px 10px 42px rgba(34, 60, 81, 0.07)",
};

// eslint-disable-next-line react-refresh/only-export-components
export const theme = createTheme({
  spacing: 2,

  palette: {
    background: {
      paper: COLORS.INPUT_BACKGROUND_GREY,
      default: COLORS.WHITE,
    },
    primary: {
      main: COLORS.APP_BLUE,
      dark: COLORS.APP_BLUE_DARK,
      light: COLORS.APP_BLUE_LIGHT,
      400: COLORS.PRIMARY_400,
      50: COLORS.PRIMARY_50,
      600: COLORS.APP_SECONDARY_MAIN,
    },
    secondary: {
      main: COLORS.APP_GREEN,
    },
    text: {
      primary: COLORS.TEXT_PRIMARY,
      secondary: COLORS.TEXT_SECONDARY,
      disabled: COLORS.TEXT_SECONDARY,
    },
    grey: {
      "500": COLORS.BORDER_COLOR,
    },
    success: {
      main: COLORS.APP_GREEN,
    },
    common: {},
    error: {
      main: COLORS.APP_RED,
    },
  },

  typography: {
    fontFamily: [
      "Work Sans",
      "Roboto",
      "Segoe UI",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),

    button: {
      textTransform: "none",
    },

    subtitle1: {
      fontSize: "12px",
      lineHeight: "14px",
      fontWeight: "500",
      color: "text.secondary",
    },

    h6: {
      fontWeight: 600,
    },

    fontWeightBold: "600",
    overline: {
      color: "primary.main",
    },
  },

  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        margin: "normal",
      },
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        input: {
          "::placeholder": {
            color: COLORS.INPUT_PLACEHOLDER,
          },
          "&[type=number]": {
            MozAppearance: "textfield",
          },
          "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          paddingLeft: "15px",
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          top: "-5px",
          left: "15px",
          fontStyle: "normal",
          fontWeight: "600",
          fontFamily: "Work Sans",
          color: COLORS.TEXT_PRIMARY,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "15px",

          "& .MuiSelect-icon": {
            right: "10px",
          },
        },
        input: {
          backgroundColor: COLORS.INPUT_BACKGROUND_GREY,
          borderRadius: "15px",
          color: COLORS.TEXT_PRIMARY,
          height: "1.25em",
          padding: "14px 12px 14px 15px",
          "::placeholder": {
            color: COLORS.INPUT_PLACEHOLDER,
          },
          boxShadow: SHADOWS.INPUT,

          ":invalid": {
            boxShadow: SHADOWS.INPUT,
          },
        },
        inputSizeSmall: {
          padding: "11px 12px 11px 15px",
          height: "1em",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        contained: {
          background: BACKGROUNDS.BUTTON_LINEAR,
          boxShadow: SHADOWS.BUTTON,

          ":disabled": {
            opacity: 0.75,
            color: "white",
          },
        },
        sizeMedium: {
          borderRadius: "10px",
        },
        sizeLarge: {
          padding: "10px 22px",
        },
      },
    },

    MuiTooltip: {
      defaultProps: {
        placement: "top",
      },
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          background: "#303E65",
        },
      },
    },

    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
          boxShadow: "0px 10px 42px rgba(34, 60, 81, 0.07)",
        },
        root: {
          "& .MuiBackdrop-root": {
            background: "rgba(229, 234, 245, 0.8)",
          },
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: "10px",
          boxShadow: "0px 10px 42px rgba(34, 60, 81, 0.07)",
          border: `1px solid ${COLORS.BORDER_COLOR}`,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 10px 42px rgba(34, 60, 81, 0.07)",
        },
        root: {
          "& .MuiBackdrop-root": {
            background: "rgba(229, 234, 245, 0.8)",
          },
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            boxShadow: "0px 10px 42px rgba(34, 60, 81, 0.07)",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: COLORS.INPUT_BACKGROUND_GREY,
          borderRadius: "15px",
        },
      },
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: { maxHeight: 250 },
          },
        },
      },
    },

    MuiTablePagination: {
      defaultProps: {
        rowsPerPageOptions: [10, 25, 50],
      },

      styleOverrides: {
        root: {
          "& .MuiToolbar-root .MuiInputBase-root .MuiSelect-icon": {
            right: 0,
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 32,
          height: 18,
          padding: 0,
          display: "flex",

          "&:active": {
            "& .MuiSwitch-thumb": {
              width: 15,
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
              transform: "translateX(9px)",
            },
          },
        },

        track: {
          borderRadius: 18 / 2,
          opacity: 1,
          backgroundColor: grey[400],
          boxSizing: "border-box",
        },

        switchBase: {
          padding: 3,
          "&.Mui-checked": {
            transform: "translateX(14px)",
            color: "#fff",

            "& + .MuiSwitch-track": {
              opacity: 1,
              backgroundColor: COLORS.APP_BLUE,
            },
          },
        },

        thumb: {
          boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
          width: 12,
          height: 12,
          borderRadius: 6,
          transition: "width 0.2s ease",
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiFormControl-root .MuiInput-root": {
            backgroundColor: "#f8faff",
            borderRadius: "15px",
            boxShadow:
              "inset 0px 1px 2px rgb(0 0 0 / 5%), inset 0px 5px 20px rgb(0 0 0 / 3%)",

            "& .MuiInput-input": {
              padding: "14px 12px 14px 15px",
              boxShadow: "none",
              background: "none",
            },
          },
        },
      },
    },
  },
});

export const GlobalStyles = (
  <MUIGlobalStyles
    styles={css`
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      a {
        text-decoration: none;
        font-weight: 500;
      }

      .rtw-wrapper {
        border-radius: 20px;
        background-color: white;
      }
    `}
  />
);
