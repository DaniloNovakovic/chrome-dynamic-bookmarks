import createReducer from "../helpers/createReducer";
import ActionHandlerFactory from "../helpers/actionHandlerFactory";
import { actionTypes, clipboardTypes } from "shared/constants";

const initialState = {};

function handleCopy(_, { data }) {
  return {
    type: clipboardTypes.COPIED,
    data
  };
}

function handleCut(_, { data }) {
  return {
    type: clipboardTypes.CUT,
    data
  };
}

const factory = new ActionHandlerFactory();
factory.register(actionTypes.COPY_TO_CLIPBOARD, handleCopy);
factory.register(actionTypes.CUT_TO_CLIPBOARD, handleCut);

export default createReducer(factory, initialState);
