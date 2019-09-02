// images
import "../images/default_favicon.png";
import "../images/icons8_Books_48.png";
import "../images/icons8_Books_64.png";

import React from "react";
import ReactDOM from "react-dom";
import Manager from "./components/bookmarkManager/Manager";
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
      <Manager />
    </SnackbarProvider>
  );
};

const element = document.getElementById("root");
element && ReactDOM.render(app(), element);
