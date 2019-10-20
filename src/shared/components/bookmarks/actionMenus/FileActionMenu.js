import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import {
  removeBookmarkNode,
  copyToClipboard,
  cutToClipboard,
  pasteToBookmarkNode,
  clipboardSelector,
  makeUniqueNodeByIdSelector
} from "shared/store";
import { DialogContext } from "shared/components/bookmarks";
import { dialogIds } from "shared/constants";
import {
  openNewTab,
  openNewWindow,
  openNewIncognitoWindow
} from "shared/lib/browser";

export function FileActionMenu(props) {
  const { openDialog } = React.useContext(DialogContext);
  const {
    node,
    nodeId,
    clipboard,
    open,
    onClose,
    onRemove,
    onCopy,
    onCut,
    onPaste,
    ...other
  } = props;

  const { url, parentId } = node;

  function handleClose() {
    onClose();
  }

  function handleRemove() {
    onRemove(nodeId);
    handleClose();
  }

  function handleCopy() {
    onCopy(node);
    handleClose();
  }

  function handleCut() {
    onCut(node);
    handleClose();
  }

  function handlePaste() {
    onPaste({
      type: clipboard.type,
      from: clipboard.data,
      to: { parentId }
    });
    handleClose();
  }

  return (
    <Menu
      id={`bookmark-action-menu`}
      keepMounted
      open={open}
      onClose={handleClose}
      {...other}
    >
      <MenuItem
        dense
        onClick={() => {
          openDialog(dialogIds.editBookmarkDialogId, { nodeId });
          handleClose();
        }}
      >
        Edit
      </MenuItem>
      <MenuItem onClick={handleRemove} dense>
        Delete
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleCut} dense>
        Cut
      </MenuItem>
      <MenuItem onClick={handleCopy} dense>
        Copy
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
        Copy URL
      </MenuItem>
      <MenuItem onClick={handlePaste} dense disabled={!clipboard.type}>
        Paste
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          openNewTab(url);
          handleClose();
        }}
        dense
      >
        Open in new tab
      </MenuItem>
      <MenuItem
        onClick={() => {
          openNewWindow(url);
          handleClose();
        }}
        dense
      >
        Open in new window
      </MenuItem>
      <MenuItem
        onClick={() => {
          openNewIncognitoWindow(url);
          handleClose();
        }}
        dense
      >
        Open in new incognito window
      </MenuItem>
    </Menu>
  );
}

function makeMapState() {
  const nodeByIdSelector = makeUniqueNodeByIdSelector();
  return (state, { nodeId = "" }) => {
    return {
      node: nodeByIdSelector(state, nodeId),
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
)(FileActionMenu);
