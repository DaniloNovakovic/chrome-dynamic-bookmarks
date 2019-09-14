import React from "react";
import { render } from "react-dom";
import Popup from "./components/popup/Popup";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "./components/helpers/SnackbarCloseButton";

const App = () => {
  return (
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
  );
};

const element = document.getElementById("root");
element && render(<App />, element);
