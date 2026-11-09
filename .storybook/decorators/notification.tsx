import React from "react";
import type { Decorator } from "@storybook/react-vite";
import { SnackbarProvider, SnackbarProviderProps } from "notistack";

type Props = SnackbarProviderProps;

const notification = (options?: Props): Decorator => {
  return (Story) => {
    return (
      <SnackbarProvider
        maxSnack={1}
        dense
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        {...(options || {})}
      >
        <Story />
      </SnackbarProvider>
    );
  };
};

export default notification;
