import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import { connect } from "react-redux";

import { nodesSelector } from "@/shared/store/selectors/index";

import createTree from "./createTree";

const readonlyIds = ["0", "1", "2"];

type BookmarkTreeViewProps = {
  className?: string;
  sx?: SxProps<Theme>;
  nodes?: Record<string, any>;
};

export function BookmarkTreeView({
  className,
  nodes = {},
  sx,
}: BookmarkTreeViewProps) {
  const rootNode = nodes["0"] || { children: [] };
  const treeItems = rootNode.children.map((childId) =>
    createTree(nodes, childId, { readonlyIds }),
  );
  return (
    <Box className={className} sx={sx}>
      {treeItems}
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    nodes: nodesSelector(state),
  };
}

export default connect(mapStateToProps)(BookmarkTreeView);
