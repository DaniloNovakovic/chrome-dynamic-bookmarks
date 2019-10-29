import { actionTypes } from "shared/constants";

export function applyFilter(filter = {}) {
  return dispatch => {
    dispatch({ type: actionTypes.APPLY_FILTER, filter });
    dispatch({ type: actionTypes.CLEAR_SELECTED });
  };
}
