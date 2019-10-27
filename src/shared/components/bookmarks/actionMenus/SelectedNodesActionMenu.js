import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { actionMenuIds } from "shared/constants";
import { selectedNodeIdsSelector, removeBookmarkNode } from "shared/store";

export function SelectedNodesActionMenu(props) {
  const {
    selectedNodeIds = [],
    open,
    onClose,
    onRemove,
    menuProps = {}
  } = props;

  function handleClose() {
    onClose();
  }

  function handleDelete() {
    onRemove(selectedNodeIds);
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
      <MenuItem dense onClick={handleClose}>
        Copy
      </MenuItem>
      <MenuItem dense onClick={handleClose}>
        Cut
      </MenuItem>
      <Divider />
      <MenuItem dense onClick={handleClose}>
        Open all bookmarks
      </MenuItem>
      <MenuItem dense onClick={handleClose}>
        Open all in new window
      </MenuItem>
      <MenuItem dense onClick={handleClose}>
        Open all in incognito window
      </MenuItem>
    </Menu>
  );
}

function mapStateToProps(state) {
  return {
    selectedNodeIds: selectedNodeIdsSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { onRemove: removeBookmarkNode }
)(SelectedNodesActionMenu);
