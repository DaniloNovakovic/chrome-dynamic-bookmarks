import React from "react";
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
  const { links = [] } = props;
  const areLinksEmpty = links.length === 0;
  return (
    <>
      <MenuItem
        dense
        disabled={areLinksEmpty}
        className={classes.menuItemFlex}
        onClick={() => {
          openNewTab(links);
          handleClose();
        }}
      >
        Open all bookmarks
        {!areLinksEmpty && (
          <Typography color="textSecondary" variant="body2">
            {links.length}
          </Typography>
        )}
      </MenuItem>
      <MenuItem
        dense
        disabled={areLinksEmpty}
        onClick={() => {
          openNewWindow(links);
          handleClose();
        }}
      >
        Open all in new window
      </MenuItem>
      <MenuItem
        dense
        disabled={areLinksEmpty}
        onClick={() => {
          openNewIncognitoWindow(links);
          handleClose();
        }}
      >
        Open all in incognito window
      </MenuItem>
    </>
  );
}
