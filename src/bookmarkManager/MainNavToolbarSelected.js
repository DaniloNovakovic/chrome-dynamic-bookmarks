import React from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Toolbar, Typography, Button } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: ({ drawerWidth }) => drawerWidth
    },
    marginRight: theme.spacing(2)
  },
  actionButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MainNavToolbarSelected({
  numberOfSelected = 0,
  onCancel,
  onDelete,
  drawerWidth
}) {
  const classes = useStyles({ drawerWidth });

  function handleCancel() {
    onCancel();
  }
  function handleDelete() {
    onDelete();
  }

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleCancel}
        className={classes.menuButton}
      >
        <Clear />
      </IconButton>
      <Typography className={classes.title} variant="body1" noWrap>
        {numberOfSelected} Selected
      </Typography>
      <Button
        className={classes.actionButton}
        variant="outlined"
        color="primary"
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        className={classes.actionButton}
        variant="outlined"
        color="primary"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </Toolbar>
  );
}
