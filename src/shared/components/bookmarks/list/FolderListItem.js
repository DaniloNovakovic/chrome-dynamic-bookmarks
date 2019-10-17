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
import { applyFilter } from "shared/store/actions";
import { ActionMenuContext } from "../actionMenus";
import { actionMenuIds } from "shared/constants";

export function FolderListItem(props) {
  const { openActionMenu } = React.useContext(ActionMenuContext);
  const { node = {}, applyFilter, iconSize = 24, selected, ...others } = props;

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
  }

  return (
    <ListItem
      button
      onDoubleClick={() => applyFilter({ parentId: node.id })}
      onContextMenu={handleContextMenu}
      style={{ minHeight: "35px" }}
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
  { applyFilter }
)(FolderListItem);

FolderListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
