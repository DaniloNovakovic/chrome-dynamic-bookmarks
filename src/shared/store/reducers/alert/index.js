import createReducer from "../helpers/createReducer";
import ActionHandlerFactory from "../helpers/actionHandlerFactory";
import { actionTypes } from "shared/constants";

const initialState = {
  type: null,
  message: null
};

function handleSuccess(_, { message }) {
  return { type: "success", message };
}

function handleError(_, { message }) {
  return { type: "error", message };
}

function handleClear() {
  return {};
}

const factory = new ActionHandlerFactory();
factory.register(actionTypes.ALERT_SUCCESS, handleSuccess);
factory.register(actionTypes.ALERT_ERROR, handleError);
factory.register(actionTypes.ALERT_CLEAR, handleClear);

export default createReducer(factory, initialState);
