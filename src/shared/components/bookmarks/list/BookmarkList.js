import React from "react";
import { connect } from "react-redux";
import { List } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import { isFolder } from "shared/lib/bookmarkNodes";
import { filteredNodesSelector } from "shared/store/selectors/index";
import { setDragTextData } from "shared/lib/dragAndDrop";
import { ActionMenuContext } from "../actionMenus";

export function BookmarkList({ filteredNodes = [] }) {
  const theme = useTheme();
  const { openActionMenu } = React.useContext(ActionMenuContext);

  function handleActionMenu(actionMenuId, props) {
    openActionMenu(actionMenuId, props);
  }

  const items = filteredNodes.map(node => {
    const ListItem = isFolder(node) ? FolderListItem : FileListItem;
    return (
      <ListItem
        key={node.id}
        node={node}
        iconSize={theme.iconSize}
        onDragStart={setDragTextData}
        openActionMenu={handleActionMenu}
      />
    );
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
