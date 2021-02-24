import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "html, body, #__next": {
          minHeight: "100vh",
        },
      },
    },
  },
  palette: {
    primary: {
      main: blue[900],
    },
  },
});

export default theme;
