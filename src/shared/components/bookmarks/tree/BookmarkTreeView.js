import React from "react";
import { connect } from "react-redux";
import createTree from "./createTree";
import { nodesSelector } from "shared/store/selectors/index";

const readonlyIds = ["0", "1", "2"];

export function BookmarkTreeView({ className, nodes = {} }) {
  const rootNode = nodes["0"] || { children: [] };
  const treeItems = rootNode.children.map(childId =>
    createTree(nodes, childId, { readonlyIds })
  );
  return <div className={className}>{treeItems}</div>;
}

function mapStateToProps(state) {
  return {
    nodes: nodesSelector(state)
  };
}

export default connect(mapStateToProps)(BookmarkTreeView);
