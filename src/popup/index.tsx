import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { createRoot } from "react-dom/client";

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
if (element) {
  createRoot(element).render(<App />);
}
