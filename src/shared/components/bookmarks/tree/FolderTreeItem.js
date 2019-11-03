import React, { useState, useEffect, useContext, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { openFolder, moveBookmarkNode } from "shared/store/actions";
import {
  breadcrumbIdsSelector,
  filterSelector,
  trackedByIdSelector
} from "shared/store/selectors/index";
import TreeItem from "./TreeItem";
import { ActionMenuContext, getAnchorPosition } from "../actionMenus";
import { actionMenuIds } from "shared/constants";

export function FolderTreeItem({
  node,
  openFolder,
  moveBookmarkNode,
  selected,
  tracked,
  readOnly,
  breadcrumbIds,
  children
}) {
  const [expanded, setExpanded] = useState(false);
  const { openActionMenu } = useContext(ActionMenuContext);
  const nodeId = node.id;

  useEffect(() => {
    if (_isAncestor(breadcrumbIds, nodeId)) {
      setExpanded(true);
    }
  }, [breadcrumbIds, nodeId]);

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded, setExpanded]);

  const handleClick = useCallback(() => {
    if (!selected) {
      openFolder(nodeId);
    }
  }, [selected, openFolder, nodeId]);

  const handleContextMenu = useCallback(
    event => {
      openActionMenu(actionMenuIds.folderActionMenuId, {
        menuProps: getAnchorPosition(event),
        nodeId: nodeId,
        readOnly
      });
      event.preventDefault();
      event.stopPropagation();
    },
    [openActionMenu, nodeId, readOnly]
  );

  const handleDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    event => {
      const fromNodeId = event.dataTransfer.getData("text");
      moveBookmarkNode(fromNodeId, { parentId: nodeId });
      event.preventDefault();
    },
    [moveBookmarkNode, nodeId]
  );

  return (
    <TreeItem
      tracked={tracked}
      selected={selected}
      expanded={expanded}
      expandIcon={expanded ? ExpandMoreIcon : ChevronRightIcon}
      labelIcon={expanded ? FolderOpenIcon : FolderIcon}
      labelText={node.title}
      toggleExpanded={toggleExpanded}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      children={children}
    />
  );
}

function _isAncestor(breadcrumbIds = [], id = "0") {
  for (let i = 0; i < breadcrumbIds.length - 1; ++i) {
    if (id == breadcrumbIds[i]) {
      return true;
    }
  }
  return false;
}

function mapStateToProps(state, { node }) {
  return {
    selected: filterSelector(state).parentId === node.id,
    breadcrumbIds: breadcrumbIdsSelector(state),
    tracked: node.id in trackedByIdSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { openFolder, moveBookmarkNode }
)(FolderTreeItem);

FolderTreeItem.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  })
};
