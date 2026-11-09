import { createTheme } from "@mui/material/styles";
import merge from "lodash/merge";

import type { CustomThemeOptions } from "./types/theme.types";

const commonTheme: CustomThemeOptions = {
  iconSize: 16,
};

const lightTheme: CustomThemeOptions = {
  palette: {
    mode: "light",
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
    error: { main: "#f44336" },
  },
  treeViewIconColor: "#616161",
};

const darkTheme: CustomThemeOptions = {
  palette: {
    mode: "dark",
    primary: { main: "#90CAF9" },
    secondary: { main: "#F48FB1" },
    error: { main: "#F44336" },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "inherit",
      },
    },
  },
};

/**
 * Returns theme of the requested type.
 * @param {('dark'|'light')} type
 */
export function getTheme(type = "dark"): CustomThemeOptions {
  switch (type) {
    case "dark":
      return merge(darkTheme, commonTheme);
    default:
      return merge(lightTheme, commonTheme);
  }
}

export default createTheme(getTheme());
