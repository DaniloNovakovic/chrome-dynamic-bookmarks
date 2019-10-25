import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem } from "@material-ui/core";
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
    for (let nodeId in selectedNodeIds) {
      onRemove(nodeId);
    }
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
