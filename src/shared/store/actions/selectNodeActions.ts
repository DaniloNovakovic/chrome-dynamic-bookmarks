import { actionTypes } from "@/shared/constants";
import { SelectedNodeIdsAction } from "@/shared/types";

export function setSelected(
  data: string | string[] = [],
): SelectedNodeIdsAction {
  return {
    type: actionTypes.SET_SELECTED,
    data,
  };
}

export function setSelectedPivot(pivot: string): SelectedNodeIdsAction {
  return {
    type: actionTypes.SET_SELECTED_PIVOT,
    pivot,
  };
}

export function selectRangeByPivot(
  from: string,
  data: string[] = [],
): SelectedNodeIdsAction {
  return {
    type: actionTypes.SELECT_RANGE_BY_PIVOT,
    data,
    from,
  };
}

export function clearSelected(): SelectedNodeIdsAction {
  return { type: actionTypes.CLEAR_SELECTED };
}

export function appendSelected(data: string | string[]): SelectedNodeIdsAction {
  return { type: actionTypes.APPEND_SELECTED, data };
}

export function removeSelected(data: string): SelectedNodeIdsAction {
  return { type: actionTypes.REMOVE_SELECTED, data };
}

export function toggleSelected(data: string): SelectedNodeIdsAction {
  return { type: actionTypes.TOGGLE_SELECTED, data };
}
