import React, { useCallback } from "react";
import { connect } from "react-redux";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import { isFolder } from "shared/lib/bookmarkNodes";
import {
  selectedByNodeIdSelector,
  selectedNodeIdsSelector,
  makeUniqueNodeByIdSelector,
  filteredNodeIdsSelector
} from "shared/store/selectors/index";
import { setDragTextData } from "shared/lib/dragAndDrop";
import { getAnchorElement, getAnchorPosition } from "../actionMenus";
import {
  toggleSelected,
  setSelectedPivot,
  selectRangeByPivot
} from "shared/store/actions";
import { actionMenuIds } from "shared/constants";

function NodeListItem(props) {
  const {
    node = {},
    selected,
    multipleSelected,
    toggleSelected,
    filteredNodeIds = [],
    setSelectedPivot,
    selectRangeByPivot,
    iconSize = 16,
    openActionMenu
  } = props;

  const handleClick = useCallback(
    (event, nodeId) => {
      if (event.ctrlKey) {
        toggleSelected(nodeId);
      } else if (event.shiftKey) {
        selectRangeByPivot(nodeId, filteredNodeIds);
      } else {
        setSelectedPivot(nodeId);
      }
      event.preventDefault();
    },
    [filteredNodeIds, toggleSelected, setSelectedPivot, selectRangeByPivot]
  );

  const handleActionMenuClick = useCallback(
    (event, nodeId, actionMenuId) => {
      openActionMenu(actionMenuId, {
        menuProps: getAnchorElement(event),
        nodeId: nodeId
      });
      setSelectedPivot(nodeId);
      event.preventDefault();
      event.stopPropagation();
    },
    [openActionMenu, setSelectedPivot]
  );

  const handleRightClick = useCallback(
    (event, nodeId, actionMenuId) => {
      const menuProps = getAnchorPosition(event);
      if (multipleSelected && selected) {
        openActionMenu(actionMenuIds.selectedNodesActionMenuId, { menuProps });
      } else {
        openActionMenu(actionMenuId, { menuProps, nodeId });
        setSelectedPivot(nodeId);
      }
      event.preventDefault();
      event.stopPropagation();
    },
    [selected, multipleSelected, openActionMenu, setSelectedPivot]
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
    const filteredNodeIds = filteredNodeIdsSelector(state);
    return { node, selected, multipleSelected, filteredNodeIds };
  };
}

export default connect(
  mapStateToProps,
  { toggleSelected, setSelectedPivot, selectRangeByPivot }
)(NodeListItem);
