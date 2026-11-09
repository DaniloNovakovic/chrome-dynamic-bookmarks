import { AppBar, Box } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

import { filterSelector, selectedNodeIdsSelector } from "@/shared/store";
import {
  applyFilter,
  clearSelected,
  removeBookmarkNode,
} from "@/shared/store/actions";

import MainNavToolbar from "./MainNavToolbar";
import MainNavToolbarSelected from "./MainNavToolbarSelected";

export function MainNav({
  sx,
  handleDrawerToggle,
  filter,
  applyFilter,
  selectedNodeIds,
  clearSelected,
  removeBookmarkNode,
  drawerWidth,
}) {
  const numberOfSelected = selectedNodeIds.length;

  function handleDelete() {
    removeBookmarkNode(selectedNodeIds);
    clearSelected();
  }
  const multipleSelected = numberOfSelected > 1;

  return (
    <AppBar position="fixed" sx={sx}>
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
  );
}

function mapStateToProps(state) {
  return {
    filter: filterSelector(state),
    selectedNodeIds: selectedNodeIdsSelector(state),
  };
}

export default connect(mapStateToProps, {
  applyFilter,
  clearSelected,
  removeBookmarkNode,
})(MainNav);
