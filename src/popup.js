import React from "react";
import ReactDOM from "react-dom";
import Popup from "./components/popup/Popup";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "./components/helpers/SnackbarCloseButton";

const app = () => {
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
element && ReactDOM.render(app(), element);
