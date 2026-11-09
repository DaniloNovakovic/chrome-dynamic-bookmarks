import type { ThemeOptions } from "@mui/material/styles";

export type CustomThemeOptions = ThemeOptions & {
  treeViewIconColor?: string;
  iconSize?: number;
};

declare module "@mui/material/styles" {
  interface Theme {
    treeViewIconColor?: string;
    iconSize?: number;
  }

  interface ThemeOptions {
    treeViewIconColor?: string;
    iconSize?: number;
  }
}
