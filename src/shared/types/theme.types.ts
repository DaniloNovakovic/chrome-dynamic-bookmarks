import type { ThemeOptions } from "@material-ui/core";

export type CustomThemeOptions = ThemeOptions & {
  treeViewIconColor?: string;
  iconSize?: number;
};

declare module "@material-ui/core/styles/createTheme" {
  interface Theme {
    treeViewIconColor?: string;
    iconSize?: number;
  }

  interface ThemeOptions {
    treeViewIconColor?: string;
    iconSize?: number;
  }
}
