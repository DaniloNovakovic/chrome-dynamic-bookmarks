import React from "react";
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
import { applyFilter, moveBookmarkNode } from "shared/store/actions";
import { ActionMenuContext } from "../actionMenus";
import { actionMenuIds } from "shared/constants";

export function FolderListItem(props) {
  const { openActionMenu } = React.useContext(ActionMenuContext);
  const {
    node = {},
    applyFilter,
    moveBookmarkNode,
    iconSize = 24,
    selected,
    ...others
  } = props;

  function showActionMenu(event) {
    openActionMenu(actionMenuIds.folderActionMenuId, {
      anchorEl: event.currentTarget,
      nodeId: node.id
    });
  }

  function handleContextMenu(event) {
    openActionMenu(actionMenuIds.folderActionMenuId, {
      anchorReference: "anchorPosition",
      anchorPosition: {
        top: event.pageY,
        left: event.pageX
      },
      nodeId: node.id
    });
    event.preventDefault();
    event.stopPropagation();
  }

  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", node.id);
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDrop(event) {
    const fromNodeId = event.dataTransfer.getData("text");
    moveBookmarkNode(fromNodeId, { parentId: node.id });
    event.preventDefault();
  }

  return (
    <ListItem
      button
      style={{ minHeight: "35px" }}
      onDoubleClick={() => applyFilter({ parentId: node.id })}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      draggable
      {...others}
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
          onClick={showActionMenu}
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
  { applyFilter, moveBookmarkNode }
)(FolderListItem);

FolderListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
