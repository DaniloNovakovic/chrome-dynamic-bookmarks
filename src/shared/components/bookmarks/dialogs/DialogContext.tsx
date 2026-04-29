import React from "react";

export type DialogContextValue = {
  openedDialogId: string | null;
  openDialog: (dialogId: string | null, args?: Record<string, unknown>) => void;
  args?: Record<string, unknown>;
};

export const DialogContext = React.createContext<DialogContextValue>({
  openedDialogId: null,
  openDialog: () => {},
  args: {},
});

export default DialogContext;
