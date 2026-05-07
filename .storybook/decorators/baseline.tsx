import React from "react";
import type { Decorator } from "@storybook/react-vite";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "@/shared/theme";

const baseline = (): Decorator => {
  return (Story) => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    );
  };
};

export default baseline;
