import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "shared/components/helpers/SnackbarCloseButton";
import Manager from "./Manager";
import { ThemeProvider } from "@material-ui/styles";
import theme from "shared/theme";
import getStore from "./getStore";

const store = getStore();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          dense
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          action={key => <SnackbarCloseButton id={key} />}
        >
          <Manager />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

const element = document.getElementById("root");
if (element) {
  render(<App />, element);
}
