import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./store/reducers/rootReducer";
import { SnackbarProvider } from "notistack";
import Manager from "./components/bookmarkManager/Manager";
import SnackbarCloseButton from "./components/helpers/SnackbarCloseButton";
import { getBookmarkNodes } from "./store/actions/bookmarkNodesActions";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(getBookmarkNodes());

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

const element = document.getElementById("root");
if (element) {
  render(<App />, element);
}
