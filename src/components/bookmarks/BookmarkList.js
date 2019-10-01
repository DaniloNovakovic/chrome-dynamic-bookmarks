import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import { useTheme } from "@material-ui/styles";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import { isFolder } from "utils/bookmarkNodes/comparisons";
import { filteredNodesSelector } from "store/selectors/index";

export function BookmarkList({ filteredNodes = [] }) {
  const theme = useTheme();

  const items = filteredNodes.map(node => {
    const ListItem = isFolder(node) ? FolderListItem : FileListItem;
    return <ListItem key={node.id} node={node} iconSize={theme.iconSize} />;
  });

  return (
    <List aria-label="main bookmark list" dense>
      {items}
    </List>
  );
}

function mapStateToProps(state) {
  return {
    filteredNodes: filteredNodesSelector(state)
  };
}

export default connect(mapStateToProps)(BookmarkList);
