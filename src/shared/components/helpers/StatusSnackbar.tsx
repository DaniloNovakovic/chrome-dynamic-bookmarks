import type { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { withSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";

import type { StoreState } from "@/shared/types";

type StatusSnackbarProps = {
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject
  ) => SnackbarKey;
};

export function StatusSnackbar({ enqueueSnackbar }: StatusSnackbarProps) {
  const alert = useSelector((state: StoreState) => state.alert);

  React.useEffect(() => {
    if (alert.message && alert.type) {
      enqueueSnackbar(alert.message, { variant: alert.type });
    }
  }, [alert]);

  return <div style={{ display: "none" }} />;
}

export default withSnackbar(StatusSnackbar);
