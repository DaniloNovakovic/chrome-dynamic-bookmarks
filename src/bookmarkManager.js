import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { SnackbarProvider } from "notistack";
import Manager from "./components/bookmarkManager/Manager";
import SnackbarCloseButton from "./components/helpers/SnackbarCloseButton";
import { getBookmarkNodes } from "./store/actions/bookmarkNodesActions";
import rootReducer from "./store/reducers/rootReducer";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

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
