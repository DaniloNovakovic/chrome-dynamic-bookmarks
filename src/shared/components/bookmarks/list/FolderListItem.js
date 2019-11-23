import React, { useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Icon,
  IconButton,
  Typography
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { actionMenuIds } from "shared/constants";
import { allowDrop } from "shared/lib/dragAndDrop";
import {
  trackedByIdSelector,
  openFolder,
  moveBookmarkNode
} from "shared/store";

function _emptyFunc() {}

export function FolderListItem(props) {
  const {
    node = {},
    iconSize = 24,
    selected,
    tracked,
    openFolder = _emptyFunc,
    moveBookmarkNode = _emptyFunc,
    onDragStart = _emptyFunc,
    onActionMenuClick = _emptyFunc,
    onClick = _emptyFunc,
    onRightClick = _emptyFunc
  } = props;
  const draggable = !!onDragStart;
  const nodeId = node.id;

  const handleActionMenuClick = useCallback(
    event => onActionMenuClick(event, nodeId, actionMenuIds.folderActionMenuId),
    [onActionMenuClick, nodeId]
  );

  const handleContextMenu = useCallback(
    event => onRightClick(event, nodeId, actionMenuIds.folderActionMenuId),
    [onRightClick, nodeId]
  );

  const handleDragStart = useCallback(event => onDragStart(event, nodeId), [
    onDragStart,
    nodeId
  ]);

  const handleDrop = useCallback(
    event => {
      const fromNodeId = event.dataTransfer.getData("text");
      moveBookmarkNode(fromNodeId, { parentId: nodeId });
      event.preventDefault();
    },
    [moveBookmarkNode, nodeId]
  );

  const handleClick = useCallback(event => onClick(event, nodeId), [
    onClick,
    nodeId
  ]);

  const handleDoubleClick = useCallback(() => openFolder(nodeId), [
    openFolder,
    nodeId
  ]);

  return (
    <ListItem
      button
      style={{ minHeight: "35px" }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onDragOver={allowDrop}
      onDrop={handleDrop}
      draggable={draggable}
      selected={selected}
    >
      <ListItemIcon style={{ minWidth: iconSize, padding: 1 }}>
        <Icon
          style={{ fontSize: iconSize + 3 }}
          color={tracked ? "primary" : "inherit"}
        >
          folder
        </Icon>
      </ListItemIcon>
      <Typography
        variant="body2"
        noWrap
        component="span"
        style={{ marginInlineStart: iconSize }}
      >
        {node.title}
      </Typography>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="more actions"
          aria-controls={`folder-action-menu`}
          aria-haspopup="true"
          onClick={handleActionMenuClick}
          onContextMenu={handleContextMenu}
          color="inherit"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function mapStateToProps(state, { node }) {
  return {
    tracked: node.id in trackedByIdSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { openFolder, moveBookmarkNode }
)(FolderListItem);

FolderListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
