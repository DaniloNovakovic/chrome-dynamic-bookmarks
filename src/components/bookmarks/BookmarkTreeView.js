import React from "react";
import { connect } from "react-redux";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import createTree from "./utils/createTree";

export function BookmarkTreeView({ className, nodes = {} }) {
  const rootNode = nodes["0"] || { children: [] };
  const treeItems = rootNode.children.map(childId =>
    createTree(nodes, childId)
  );
  return (
    <TreeView
      className={className}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      children={treeItems}
    />
  );
}

function mapStateToProps(state) {
  return {
    nodes: state.bookmarkNodes.nodes
  };
}

export default connect(mapStateToProps)(BookmarkTreeView);
