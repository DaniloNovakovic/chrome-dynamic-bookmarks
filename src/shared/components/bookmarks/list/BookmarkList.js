import React, { useCallback } from "react";
import { connect } from "react-redux";
import { List } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import { isFolder } from "shared/lib/bookmarkNodes";
import {
  filteredNodesSelector,
  selectedNodeIdsSelector
} from "shared/store/selectors/index";
import { setDragTextData } from "shared/lib/dragAndDrop";
import {
  ActionMenuContext,
  getAnchorElement,
  getAnchorPosition
} from "../actionMenus";
import { toggleSelected, setSelected } from "shared/store/actions";
import { actionMenuIds } from "shared/constants";

export function BookmarkList(props) {
  const {
    filteredNodes = [],
    selectedNodeIds = [],
    toggleSelected,
    setSelected
  } = props;
  const theme = useTheme();
  const { openActionMenu } = React.useContext(ActionMenuContext);

  const handleClick = useCallback(
    (event, nodeId) => {
      if (event.ctrlKey) {
        toggleSelected(nodeId);
      } else {
        setSelected(nodeId);
      }
      event.preventDefault();
    },
    [toggleSelected, setSelected]
  );

  const handleActionMenuClick = useCallback(
    (event, nodeId, actionMenuId) => {
      openActionMenu(actionMenuId, {
        menuProps: getAnchorElement(event),
        nodeId: nodeId
      });
      setSelected(nodeId);
      event.preventDefault();
      event.stopPropagation();
    },
    [openActionMenu, setSelected]
  );

  const handleRightClick = useCallback(
    (event, nodeId, actionMenuId) => {
      const menuProps = getAnchorPosition(event);
      if (selectedNodeIds.length > 1 && selectedNodeIds.includes(nodeId)) {
        openActionMenu(actionMenuIds.selectedNodesActionMenuId, { menuProps });
      } else {
        openActionMenu(actionMenuId, { menuProps, nodeId });
        setSelected(nodeId);
      }
      event.preventDefault();
      event.stopPropagation();
    },
    [selectedNodeIds, openActionMenu, setSelected]
  );

  const items = filteredNodes.map(node => {
    const ListItem = isFolder(node) ? FolderListItem : FileListItem;
    return (
      <ListItem
        key={node.id}
        node={node}
        iconSize={theme.iconSize}
        onDragStart={setDragTextData}
        onClick={handleClick}
        onActionMenuClick={handleActionMenuClick}
        onRightClick={handleRightClick}
        selected={selectedNodeIds.includes(node.id)}
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
    selectedNodeIds: selectedNodeIdsSelector(state),
    filteredNodes: filteredNodesSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { toggleSelected, setSelected }
)(BookmarkList);
