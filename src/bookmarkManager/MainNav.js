import React from "react";
import { connect } from "react-redux";
import { AppBar } from "@material-ui/core";
import {
  applyFilter,
  clearSelected,
  removeBookmarkNode
} from "shared/store/actions";
import MainNavToolbar from "./MainNavToolbar";
import { selectedNodeIdsSelector } from "shared/store";
import MainNavToolbarSelected from "./MainNavToolbarSelected";

export function MainNav({
  className,
  handleDrawerToggle,
  applyFilter,
  selectedNodeIds,
  clearSelected,
  removeBookmarkNode,
  drawerWidth
}) {
  const numberOfSelected = selectedNodeIds.length;

  function handleDelete() {
    for (let nodeId of selectedNodeIds) {
      removeBookmarkNode(nodeId);
    }
    clearSelected();
  }

  return (
    <AppBar position="fixed" className={className}>
      {numberOfSelected > 1 ? (
        <MainNavToolbarSelected
          numberOfSelected={numberOfSelected}
          onCancel={clearSelected}
          onDelete={handleDelete}
          drawerWidth={drawerWidth}
        />
      ) : (
        <MainNavToolbar
          handleDrawerToggle={handleDrawerToggle}
          applyFilter={applyFilter}
        />
      )}
    </AppBar>
  );
}

function mapStateToProps(state) {
  return {
    selectedNodeIds: selectedNodeIdsSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { applyFilter, clearSelected, removeBookmarkNode }
)(MainNav);
