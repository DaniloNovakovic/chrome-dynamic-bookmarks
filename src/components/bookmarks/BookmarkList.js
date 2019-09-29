import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import { isFolder } from "utils/bookmarkNodes/comparisons";
import { filteredNodesSelector } from "store/selectors/index";

function mapNodeToJsx(node) {
  return isFolder(node) ? (
    <FolderListItem key={node.id} bookmark={node} />
  ) : (
    <FileListItem key={node.id} bookmark={node} />
  );
}

export function BookmarkList({ nodes = {} }) {
  const items = nodes.map(node => {
    return mapNodeToJsx(node);
  });

  return (
    <List aria-label="main bookmark list" dense>
      {items}
    </List>
  );
}

function mapStateToProps(state) {
  return { nodes: filteredNodesSelector(state) };
}

export default connect(mapStateToProps)(BookmarkList);
