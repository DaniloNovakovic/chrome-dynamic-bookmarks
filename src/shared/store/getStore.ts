import { applyMiddleware, createStore } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";

import rootReducer from "@/shared/store/reducers/rootReducer";

const getStore = () => {
  let middleware = [thunkMiddleware];

  if (process.env.NODE_ENV !== "production") {
    const reduxLogger = require("redux-logger");
    middleware = [...middleware, reduxLogger.createLogger()];
  }

  return createStore(rootReducer, applyMiddleware(...middleware));
};

export default getStore;
