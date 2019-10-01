import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { makeStyles } from "@material-ui/styles";
import BookmarkIcon from "./BookmarkIcon";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { FileActionMenuContext } from "./FileActionMenuContext";

const iconSize = 24;

const useStyles = makeStyles(theme => ({
  iconWrapper: {
    minWidth: iconSize * 2
  }
}));

export default function FileListItem(props) {
  const classes = useStyles();
  const { setAnchorEl } = React.useContext(FileActionMenuContext);
  const { node = {}, ...others } = props;

  function showActionMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <ListItem button {...others}>
      <ListItemIcon className={classes.iconWrapper}>
        <BookmarkIcon url={node.url} size={iconSize} />
      </ListItemIcon>
      <ListItemText
        primary={node.title}
        secondary={node.url}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="more actions"
          aria-controls={`bookmark-action-menu`}
          aria-haspopup="true"
          onClick={showActionMenu}
          color="inherit"
        >
          <MoreVertIcon />
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
