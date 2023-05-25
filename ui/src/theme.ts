import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#383582",
    },
    error: {
      main: "#FF0000",
    },
    warning: {
      main: "#EEF22A",
    },
    text: {
      primary: "#fafafa",
    },
    background: {
      paper: "#181818",
    },
  },
  typography: {
    h1: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    h2: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    h3: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    h4: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    h5: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    h6: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    subtitle1: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    subtitle2: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    body1: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    body2: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    caption: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
    overline: {
      color: "#FAFAFA",
      fontFamily: "Roboto",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              color: "#181818",
            }),
        }),
      },
    },
  },
});

export default theme;
