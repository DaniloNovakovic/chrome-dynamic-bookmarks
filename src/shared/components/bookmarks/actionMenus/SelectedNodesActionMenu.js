import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { actionMenuIds } from "shared/constants";
import {
  selectedNodeIdsSelector,
  selectedBookmarksUrlSelector,
  removeBookmarkNode,
  copyToClipboard,
  cutToClipboard
} from "shared/store";
import OpenLinksActionMenuItems from "./OpenLinksActionMenuItems";

export function SelectedNodesActionMenu(props) {
  const {
    selectedNodeIds = [],
    selectedBookmarkUrls = [],
    open,
    onClose,
    onRemove,
    onCopy,
    onCut,
    menuProps = {}
  } = props;

  function handleClose() {
    onClose();
  }

  function handleDelete() {
    onRemove(selectedNodeIds);
    handleClose();
  }

  function handleCopy() {
    onCopy({ id: selectedNodeIds });
    handleClose();
  }

  function handleCut() {
    onCut({ id: selectedNodeIds });
    handleClose();
  }

  return (
    <Menu
      id={actionMenuIds.selectedNodesActionMenuId}
      keepMounted
      open={open}
      onClose={handleClose}
      {...menuProps}
    >
      <MenuItem dense onClick={handleDelete}>
        Delete
      </MenuItem>
      <Divider />
      <MenuItem dense onClick={handleCut}>
        Cut
      </MenuItem>
      <MenuItem dense onClick={handleCopy}>
        Copy
      </MenuItem>
      <Divider />
      <OpenLinksActionMenuItems
        links={selectedBookmarkUrls}
        onClose={handleClose}
      />
    </Menu>
  );
}

function mapStateToProps(state) {
  return {
    selectedNodeIds: selectedNodeIdsSelector(state),
    selectedBookmarkUrls: selectedBookmarksUrlSelector(state)
  };
}

export default connect(
  mapStateToProps,
  {
    onRemove: removeBookmarkNode,
    onCopy: copyToClipboard,
    onCut: cutToClipboard
  }
)(SelectedNodesActionMenu);
