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
import { openFolder, moveBookmarkNode } from "shared/store/actions";
import { actionMenuIds } from "shared/constants";
import { allowDrop } from "shared/lib/dragAndDrop";

function _emptyFunc() {}

export function FolderListItem(props) {
  const {
    node = {},
    iconSize = 24,
    selected,
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
        <Icon style={{ fontSize: iconSize + 3 }}>folder</Icon>
      </ListItemIcon>
      <Typography
        variant="body2"
        noWrap
        component="span"
        color="textPrimary"
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

export default connect(
  null,
  { openFolder, moveBookmarkNode }
)(FolderListItem);

FolderListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
