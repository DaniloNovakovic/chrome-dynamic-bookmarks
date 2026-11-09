import { MenuItem, Typography } from "@mui/material";
import React, { useCallback } from "react";

import {
  openNewIncognitoWindow,
  openNewTab,
  openNewWindow,
} from "@/shared/lib/browser";

export default function OpenLinksActionMenuItems(props) {
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
        sx={{ display: "flex", justifyContent: "space-between" }}
        onClick={handleOpenAll}
      >
        Open all bookmarks
        {!areLinksEmpty && (
          <Typography color="text.secondary" variant="body2">
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
