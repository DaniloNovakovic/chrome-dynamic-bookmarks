import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";

import type { StoreState } from "@/shared/types";

export function StatusSnackbar() {
  const { enqueueSnackbar } = useSnackbar();
  const alert = useSelector((state: StoreState) => state.alert);

  React.useEffect(() => {
    if (alert.message && alert.type) {
      enqueueSnackbar(alert.message, { variant: alert.type });
    }
  }, [alert, enqueueSnackbar]);

  return <div style={{ display: "none" }} />;
}

export default StatusSnackbar;
