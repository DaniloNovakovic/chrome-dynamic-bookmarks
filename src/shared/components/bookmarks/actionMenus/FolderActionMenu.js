import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  removeBookmarkNode,
  copyToClipboard,
  cutToClipboard,
  pasteToBookmarkNode,
  clipboardSelector,
  bookmarksByParentIdSelector
} from "shared/store";
import { DialogContext } from "shared/components/bookmarks";
import { dialogIds } from "shared/constants";
import { createSelector } from "reselect";
import {
  openNewTab,
  openNewWindow,
  openNewIncognitoWindow
} from "shared/lib/browser";

const useStyles = makeStyles(theme => {
  return {
    menuItemFlex: {
      display: "flex",
      justifyContent: "space-between"
    }
  };
});

export function FolderActionMenu(props) {
  const { openDialog } = React.useContext(DialogContext);
  const {
    nodeId,
    readOnly,
    open,
    childUrls = [],
    onClose,
    onRemove,
    onCopy,
    onCut,
    onPaste,
    clipboard,
    menuProps = {}
  } = props;
  const classes = useStyles();

  function handleClose() {
    onClose();
  }

  function handleRemove() {
    onRemove(nodeId);
    handleClose();
  }

  function handleCopy() {
    onCopy({ nodeId });
    handleClose();
  }
  function handleCut() {
    onCut({ nodeId });
    handleClose();
  }

  function handlePaste() {
    onPaste({
      type: clipboard.type,
      from: clipboard.data,
      to: { parentId: nodeId }
    });
    handleClose();
  }

  function handleDialogOpen(dialogId, args = {}) {
    openDialog(dialogId, args);
    handleClose();
  }

  const isChildUrlsEmpty = childUrls.length === 0;

  return (
    <Menu
      id={`folder-action-menu`}
      keepMounted
      open={open}
      onClose={handleClose}
      {...menuProps}
    >
      <MenuItem
        dense
        disabled={readOnly}
        onClick={() =>
          handleDialogOpen(dialogIds.editFolderDialogId, { nodeId })
        }
      >
        Rename
      </MenuItem>
      <MenuItem dense disabled={readOnly} onClick={handleRemove}>
        Delete
      </MenuItem>
      <Divider />
      <MenuItem dense disabled={readOnly} onClick={handleCut}>
        Cut
      </MenuItem>
      <MenuItem dense onClick={handleCopy}>
        Copy
      </MenuItem>
      <MenuItem dense disabled={!clipboard.type} onClick={handlePaste}>
        Paste
      </MenuItem>
      <Divider />
      <MenuItem
        dense
        disabled={isChildUrlsEmpty}
        className={classes.menuItemFlex}
        onClick={() => {
          openNewTab(childUrls);
          handleClose();
        }}
      >
        Open all bookmarks
        {!isChildUrlsEmpty && (
          <Typography color="textSecondary" variant="body2">
            {childUrls.length}
          </Typography>
        )}
      </MenuItem>
      <MenuItem
        dense
        disabled={isChildUrlsEmpty}
        onClick={() => {
          openNewWindow(childUrls);
          handleClose();
        }}
      >
        Open all in new window
      </MenuItem>
      <MenuItem
        dense
        disabled={isChildUrlsEmpty}
        onClick={() => {
          openNewIncognitoWindow(childUrls);
          handleClose();
        }}
      >
        Open all in incognito window
      </MenuItem>
    </Menu>
  );
}

const makeUniqueChildUrlSelector = () =>
  createSelector(
    bookmarksByParentIdSelector,
    (bookmarks = []) => {
      return bookmarks.map(node => node.url);
    }
  );

function makeMapState() {
  const childUrlSelector = makeUniqueChildUrlSelector();
  return (state, { nodeId = "" }) => {
    return {
      childUrls: childUrlSelector(state, nodeId),
      clipboard: clipboardSelector(state)
    };
  };
}

export default connect(
  makeMapState,
  {
    onRemove: removeBookmarkNode,
    onCopy: copyToClipboard,
    onCut: cutToClipboard,
    onPaste: pasteToBookmarkNode
  }
)(FolderActionMenu);
