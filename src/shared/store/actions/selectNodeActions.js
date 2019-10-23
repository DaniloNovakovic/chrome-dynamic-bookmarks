import { actionTypes } from "shared/constants";

export function setSelected(data = []) {
  return {
    type: actionTypes.SET_SELECTED,
    data
  };
}

export function clearSelected() {
  return { type: actionTypes.CLEAR_SELECTED };
}

export function appendSelected(data) {
  return { type: actionTypes.APPEND_SELECTED, data };
}

export function removeSelected(data) {
  return { type: actionTypes.REMOVE_SELECTED, data };
}

export function toggleSelected(data) {
  return { type: actionTypes.TOGGLE_SELECTED, data };
}
