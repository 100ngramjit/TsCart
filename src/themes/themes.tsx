import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  typography: {
    fontFamily: "baumans",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          disableElevation: true,
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#01BAEF",
    },
    secondary: {
      main: "#16425B",
    },
    warning: {
      main: "#E4FF1A",
    },
    error: {
      main: "#FE5F55",
    },
    info: {
      main: "#DADFF7",
    },
    success: {
      main: "#94E059",
    },
  },
});

export const lightTheme = createTheme({
  typography: {
    fontFamily: "baumans",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          disableElevation: true,
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#01BAEF",
    },
    secondary: {
      main: "#16425B",
    },
    warning: {
      main: "#E4FF1A",
    },
    error: {
      main: "#FE5F55",
    },
    info: {
      main: "#DADFF7",
    },
    success: {
      main: "#94E059",
    },
  },
});
