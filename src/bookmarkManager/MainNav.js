import React from "react";
import { connect } from "react-redux";
import { AppBar, Box } from "@material-ui/core";
import {
  applyFilter,
  clearSelected,
  removeBookmarkNode
} from "shared/store/actions";
import MainNavToolbar from "./MainNavToolbar";
import { selectedNodeIdsSelector, filterSelector } from "shared/store";
import MainNavToolbarSelected from "./MainNavToolbarSelected";
import { IgnoreKeys } from "react-hotkeys";

export function MainNav({
  className,
  handleDrawerToggle,
  filter,
  applyFilter,
  selectedNodeIds,
  clearSelected,
  removeBookmarkNode,
  drawerWidth
}) {
  const numberOfSelected = selectedNodeIds.length;

  function handleDelete() {
    removeBookmarkNode(selectedNodeIds);
    clearSelected();
  }
  const multipleSelected = numberOfSelected > 1;

  return (
    <IgnoreKeys>
      <AppBar position="fixed" className={className}>
        <Box hidden={!multipleSelected}>
          <MainNavToolbarSelected
            numberOfSelected={numberOfSelected}
            onCancel={clearSelected}
            onDelete={handleDelete}
            drawerWidth={drawerWidth}
          />
        </Box>
        <Box hidden={multipleSelected}>
          <MainNavToolbar
            handleDrawerToggle={handleDrawerToggle}
            filter={filter}
            applyFilter={applyFilter}
          />
        </Box>
      </AppBar>
    </IgnoreKeys>
  );
}

function mapStateToProps(state) {
  return {
    filter: filterSelector(state),
    selectedNodeIds: selectedNodeIdsSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { applyFilter, clearSelected, removeBookmarkNode }
)(MainNav);
