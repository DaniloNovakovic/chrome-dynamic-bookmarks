import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "shared/store/reducers/rootReducer";

export default function getStore() {
  let middleware = [thunkMiddleware];

  if (process.env.NODE_ENV !== "production") {
    const reduxLogger = require("redux-logger");
    middleware = [...middleware, reduxLogger.createLogger()];
  }

  return createStore(rootReducer, applyMiddleware(...middleware));
}
