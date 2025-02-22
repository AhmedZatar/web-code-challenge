import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    edited: Palette["primary"];
  }

  interface PaletteOptions {
    edited?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#003545",
    },
    secondary: {
      main: "#E8424C",
    },
    info: {
      main: "#17A2B8",
    },
    background: {
      default: "#F5F5F5",
    },
    text: {
      primary: "#003545",
      secondary: "#003545",
    },
    edited: {
      main: "#FFEB99",
      light: "#FFF5CC",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
