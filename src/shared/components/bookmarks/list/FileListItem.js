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
import { FileActionMenuContext } from "../actionMenus";
import BookmarkIcon from "../BookmarkIcon";

export default function FileListItem(props) {
  const { setAnchorEl } = React.useContext(FileActionMenuContext);
  const { node = {}, iconSize = 24, selected, ...others } = props;

  function showActionMenu(event) {
    setAnchorEl(event.currentTarget, node.id);
  }

  return (
    <ListItem button style={{ minHeight: "35px" }} {...others}>
      <ListItemIcon style={{ minWidth: iconSize, margin: 2 }}>
        <BookmarkIcon url={node.url} size={iconSize} />
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
          color="inherit"
          size="small"
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
