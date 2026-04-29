import "core-js/stable";
import "regenerator-runtime/runtime";

import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { render } from "react-dom";

import { SnackbarCloseButton } from "@/shared/components/helpers";
import theme from "@/shared/theme";

import Popup from "./components/Popup";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        dense
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        action={(key) => <SnackbarCloseButton id={key} />}
      >
        <Popup />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const element = document.getElementById("root");
element && render(<App />, element);
