import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#265D97",
      dark: "#003A75",
      light: "#757ce8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f44336",
      dark: "#ba000d",
      light: "#ff7961",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#001e3c",
      default: "#0a1929",
    },
    // text: {
    //   primary: "#00adb5",
    //   secondary: "#c9cdd1",
    // },
  },
  typography: {
    allVariants: {
      color: "#fff",
    },
  },
});
