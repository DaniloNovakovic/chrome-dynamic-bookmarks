import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import Manager from "./components/bookmarkManager/Manager";
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
      <Manager />
    </SnackbarProvider>
  );
};

const element = document.getElementById("root");
if (element) {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    element
  );
}

if (module.hot) {
  module.hot.accept();
}
