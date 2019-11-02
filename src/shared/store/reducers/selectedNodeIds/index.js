import createReducer from "../helpers/createReducer";
import ActionHandlerFactory from "../helpers/actionHandlerFactory";
import actionTypes from "shared/constants/actionTypes";
import { indexOfOrDefault, sliceRange } from "shared/lib/array";

const initialState = { data: [], pivot: null };

function setSelectedHandler(state, { data }) {
  if (!data) {
    return { ...state, data: [] };
  }
  if (Array.isArray(data)) {
    return { ...state, data };
  }
  return { ...state, data: [data] };
}

function appendSelectedHandler(state, { data }) {
  if (Array.isArray(data)) {
    return { ...state, data: [...state.data, ...data] };
  }
  return { ...state, data: [...state.data, data] };
}

function removeSelectedHandler(state, { data }) {
  return { ...state, data: state.data.filter(val => val != data) };
}

function clearSelectedHandler() {
  return { data: [] };
}

function toggleSelectedHandler(state, { data }) {
  if (state.data.includes(data)) {
    return removeSelectedHandler(state, { data });
  } else {
    return appendSelectedHandler(state, { data });
  }
}

function setSelectedPivotHandler(_, { pivot }) {
  const data = pivot ? [pivot] : [];
  return { pivot, data };
}

function selectRangeByPivotHandler(state, { from, data = [] }) {
  const pivot = state.pivot;
  if (pivot === from || !pivot) {
    return { pivot: from, data: [from] };
  }
  const fromIndex = indexOfOrDefault(data, from, 0);
  const pivotIndex = indexOfOrDefault(data, pivot, fromIndex);
  const newData = sliceRange(data, fromIndex, pivotIndex);
  return { ...state, data: newData };
}

const factory = new ActionHandlerFactory();
factory.register(actionTypes.SET_SELECTED, setSelectedHandler);
factory.register(actionTypes.APPEND_SELECTED, appendSelectedHandler);
factory.register(actionTypes.REMOVE_SELECTED, removeSelectedHandler);
factory.register(actionTypes.CLEAR_SELECTED, clearSelectedHandler);
factory.register(actionTypes.TOGGLE_SELECTED, toggleSelectedHandler);
factory.register(actionTypes.SET_SELECTED_PIVOT, setSelectedPivotHandler);
factory.register(actionTypes.SELECT_RANGE_BY_PIVOT, selectRangeByPivotHandler);

export default createReducer(factory, initialState);
