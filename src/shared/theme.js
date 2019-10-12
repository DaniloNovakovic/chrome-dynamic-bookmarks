import { createMuiTheme } from "@material-ui/core/styles";

const commonTheme = {
  iconSize: 16
};

const lightTheme = {
  ...commonTheme,
  palette: {
    type: "light",
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
    error: { main: "#f44336" }
  },
  treeViewIconColor: "#616161"
};

const darkTheme = {
  ...commonTheme,
  palette: {
    type: "dark",
    primary: { main: "#90CAF9" },
    secondary: { main: "#F48FB1" },
    error: { main: "#F44336" }
  },
  props: {
    MuiAppBar: {
      color: "inherit"
    }
  }
};

/**
 * Returns theme of the requested type.
 * @param {('dark'|'light')} type
 */
export function getTheme(type = "dark") {
  switch (type) {
    case "dark":
      return darkTheme;
    default:
      return lightTheme;
  }
}

export default createMuiTheme(getTheme());
