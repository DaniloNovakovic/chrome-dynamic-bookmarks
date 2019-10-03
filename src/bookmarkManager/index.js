import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "shared/components/helpers/SnackbarCloseButton";
import { getBookmarkNodes } from "shared/store/actions/bookmarkNodesActions";
import rootReducer from "shared/store/reducers/rootReducer";
import Manager from "./Manager";
import { ThemeProvider } from "@material-ui/styles";
import theme from "shared/theme";

let middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== "production") {
  const reduxLogger = require("redux-logger");
  middleware = [...middleware, reduxLogger.createLogger()];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

store.dispatch(getBookmarkNodes());

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
          action={key => <SnackbarCloseButton key={key} />}
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
