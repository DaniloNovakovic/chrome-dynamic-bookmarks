import React, { useCallback } from "react";
import { MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  openNewTab,
  openNewWindow,
  openNewIncognitoWindow
} from "shared/lib/browser";

const useStyles = makeStyles(() => {
  return {
    menuItemFlex: {
      display: "flex",
      justifyContent: "space-between"
    }
  };
});

export default function OpenLinksActionMenuItems(props) {
  const classes = useStyles();
  const { links = [], onClose: handleClose } = props;
  const areLinksEmpty = links.length === 0;

  const handleOpenAll = useCallback(() => {
    openNewTab(links);
    handleClose();
  }, [links, handleClose]);

  const handleOpenAllNewWindow = useCallback(() => {
    openNewWindow(links);
    handleClose();
  }, [links, handleClose]);

  const handleOpenAllNewIncognitoWindow = useCallback(() => {
    openNewIncognitoWindow(links);
    handleClose();
  }, [links, handleClose]);

  return (
    <>
      <MenuItem
        dense
        disabled={areLinksEmpty}
        className={classes.menuItemFlex}
        onClick={handleOpenAll}
      >
        Open all bookmarks
        {!areLinksEmpty && (
          <Typography color="textSecondary" variant="body2">
            {links.length}
          </Typography>
        )}
      </MenuItem>
      <MenuItem dense disabled={areLinksEmpty} onClick={handleOpenAllNewWindow}>
        Open all in new window
      </MenuItem>
      <MenuItem
        dense
        disabled={areLinksEmpty}
        onClick={handleOpenAllNewIncognitoWindow}
      >
        Open all in incognito window
      </MenuItem>
    </>
  );
}
