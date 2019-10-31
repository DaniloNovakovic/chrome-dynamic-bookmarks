import React, { useCallback } from "react";
import { connect } from "react-redux";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import { isFolder } from "shared/lib/bookmarkNodes";
import {
  selectedByNodeIdSelector,
  selectedNodeIdsSelector,
  makeUniqueNodeByIdSelector
} from "shared/store/selectors/index";
import { setDragTextData } from "shared/lib/dragAndDrop";
import { getAnchorElement, getAnchorPosition } from "../actionMenus";
import { toggleSelected, setSelected } from "shared/store/actions";
import { actionMenuIds } from "shared/constants";

function NodeListItem(props) {
  const {
    node = {},
    selected,
    multipleSelected,
    toggleSelected,
    setSelected,
    iconSize = 16,
    openActionMenu
  } = props;

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
      if (multipleSelected && selected) {
        openActionMenu(actionMenuIds.selectedNodesActionMenuId, { menuProps });
      } else {
        openActionMenu(actionMenuId, { menuProps, nodeId });
        setSelected(nodeId);
      }
      event.preventDefault();
      event.stopPropagation();
    },
    [selected, multipleSelected, openActionMenu, setSelected]
  );

  const ListItem = isFolder(node) ? FolderListItem : FileListItem;
  return (
    <ListItem
      key={node.id}
      node={node}
      iconSize={iconSize}
      onDragStart={setDragTextData}
      onClick={handleClick}
      onActionMenuClick={handleActionMenuClick}
      onRightClick={handleRightClick}
      selected={selected}
    />
  );
}

function mapStateToProps() {
  const nodeByIdSelector = makeUniqueNodeByIdSelector();
  return (state, ownProps) => {
    const nodeId = ownProps.nodeId || ownProps.id;
    const selectedById = selectedByNodeIdSelector(state);
    const selected = nodeId in selectedById;
    const multipleSelected = selectedNodeIdsSelector(state).length > 1;
    const node = nodeByIdSelector(state, nodeId);
    return { node, selected, multipleSelected };
  };
}

export default connect(
  mapStateToProps,
  { toggleSelected, setSelected }
)(NodeListItem);
