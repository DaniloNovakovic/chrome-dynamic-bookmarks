import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import SnackbarCloseButton from "@/shared/components/helpers/SnackbarCloseButton";
import { getStore } from "@/shared/store";
import theme from "@/shared/theme";

import attachStoreToListeners from "./attachStoreToListeners";
import Manager from "./Manager";

const store = getStore();

attachStoreToListeners(store);

const App = () => {
  return (
    <Provider store={store}>
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
          <Manager />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

const element = document.getElementById("root");
if (element) {
  createRoot(element).render(<App />);
}
