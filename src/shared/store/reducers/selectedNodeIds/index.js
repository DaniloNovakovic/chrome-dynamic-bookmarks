import createReducer from "../helpers/createReducer";
import ActionHandlerFactory from "../helpers/actionHandlerFactory";
import actionTypes from "shared/constants/actionTypes";

const initialState = [];

function setSelectedHandler(_, { data }) {
  if (!data) {
    return [];
  }
  if (Array.isArray(data)) {
    return data;
  }
  return [data];
}

function appendSelectedHandler(state, { data }) {
  if (Array.isArray(data)) {
    return [...state, ...data];
  }
  return [...state, data];
}

function removeSelectedHandler(state, { data }) {
  return state.filter(val => val != data);
}

function clearSelectedHandler() {
  return [];
}

function toggleSelectedHandler(state, { data }) {
  if (state.includes(data)) {
    return removeSelectedHandler(state, { data });
  } else {
    return appendSelectedHandler(state, { data });
  }
}

const factory = new ActionHandlerFactory();
factory.register(actionTypes.SET_SELECTED, setSelectedHandler);
factory.register(actionTypes.APPEND_SELECTED, appendSelectedHandler);
factory.register(actionTypes.REMOVE_SELECTED, removeSelectedHandler);
factory.register(actionTypes.CLEAR_SELECTED, clearSelectedHandler);
factory.register(actionTypes.TOGGLE_SELECTED, toggleSelectedHandler);

export default createReducer(factory, initialState);
