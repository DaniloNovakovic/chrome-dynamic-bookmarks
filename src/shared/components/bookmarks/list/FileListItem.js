import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Typography
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ActionMenuContext } from "../actionMenus";
import BookmarkIcon from "../BookmarkIcon";
import { actionMenuIds } from "shared/constants";

export default function FileListItem(props) {
  const { openActionMenu } = React.useContext(ActionMenuContext);
  const { node = {}, iconSize = 24, selected, ...others } = props;

  function showActionMenu(event) {
    openActionMenu(actionMenuIds.fileActionMenuId, {
      anchorEl: event.currentTarget,
      nodeId: node.id
    });
  }

  function handleContextMenu(event) {
    openActionMenu(actionMenuIds.fileActionMenuId, {
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

  return (
    <ListItem
      button
      style={{ minHeight: "35px" }}
      onContextMenu={handleContextMenu}
      {...others}
    >
      <ListItemIcon style={{ minWidth: iconSize, margin: 2 }}>
        <BookmarkIcon url={node.url} size={iconSize} />
      </ListItemIcon>
      <Typography
        variant="body2"
        noWrap
        component="span"
        color={node.regExp ? "primary" : "textPrimary"}
        style={{ marginInlineStart: iconSize }}
      >
        {node.title}
      </Typography>
      <Typography
        variant="body2"
        noWrap
        component="span"
        color="textSecondary"
        style={{
          marginInlineStart: "1em",
          ...(!selected && { display: "none" })
        }}
      >
        {node.url}
      </Typography>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="more actions"
          aria-controls={`bookmark-action-menu`}
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

FileListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};
