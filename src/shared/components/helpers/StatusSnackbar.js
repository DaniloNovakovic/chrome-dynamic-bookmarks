import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { withSnackbar } from "notistack";

export function StatusSnackbar({ enqueueSnackbar }) {
  const alert = useSelector(state => state.alert);

  React.useEffect(() => {
    if (alert.message && alert.type) {
      enqueueSnackbar(alert.message, { variant: alert.type });
    }
  }, [alert]);

  return <div style={{ display: "none" }} />;
}

StatusSnackbar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(StatusSnackbar);
