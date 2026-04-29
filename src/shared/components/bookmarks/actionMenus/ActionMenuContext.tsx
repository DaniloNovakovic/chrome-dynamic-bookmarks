import React from "react";

export type ActionMenuContextValue = {
  openedActionMenuId: string | null;
  openActionMenu: (
    actionMenuId: string | null,
    args?: Record<string, unknown>
  ) => void;
  args?: Record<string, unknown>;
};

export const ActionMenuContext = React.createContext<ActionMenuContextValue>({
  openedActionMenuId: null,
  openActionMenu: () => {},
  args: {},
});

export default ActionMenuContext;
