import { Action } from "redux";

import { NormalizedDynamicBookmark } from "./bookmark.types";
import { MakeOptional } from "./common.types";
import { MessageResponseType } from "./message.types";

export type ActionHandler<TState, TAction extends Action> = (
  state: TState,
  action: MakeOptional<TAction, "type">,
) => TState;

export type AlertState = {
  type?: MessageResponseType;
  message?: string;
};

export type AlertAction = Action<string> & {
  message?: string;
};

export type ClipboardState = {
  type?: string;
  message?: string;
};

export type ClipboardAction = Action<string> & {
  data?: unknown;
};

export type FilterState = {
  searchText?: string;
  parentId?: string;
};

export type FilterAction = Action<string> & {
  filter?: FilterState;
};

export type SelectedNodeIdsState = { data: string[]; pivot?: string };

export type SelectedNodeIdsAction = Action<string> & {
  pivot?: string;
  data?: string | string[];
  from?: string;
};

export type BookmarkNodesState = {
  data: Record<string, NormalizedDynamicBookmark>;
  isFaulted?: boolean;
  errMsg?: string;
};

export type BookmarkNodesAction = Action<string> & {
  bookmarkNodes?: Record<string, NormalizedDynamicBookmark>;
  errMsg?: string;
  data?: NormalizedDynamicBookmark;
};

export type StoreState = {
  alert: AlertState;
  bookmarkNodes: BookmarkNodesState;
  clipboard: ClipboardState;
  filter: FilterState;
  selectedNodeIds: SelectedNodeIdsState;
};
