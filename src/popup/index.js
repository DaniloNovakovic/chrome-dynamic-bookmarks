import React from "react";
import { render } from "react-dom";
import Popup from "./Popup";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/styles";
import SnackbarCloseButton from "shared/components/helpers/SnackbarCloseButton";
import theme from "shared/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        dense
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        action={key => <SnackbarCloseButton key={key} />}
      >
        <Popup />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const element = document.getElementById("root");
element && render(<App />, element);
