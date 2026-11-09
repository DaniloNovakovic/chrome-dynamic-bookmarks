import { Clear } from "@mui/icons-material";
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function MainNavToolbarSelected({
  numberOfSelected = 0,
  onCancel,
  onDelete,
  drawerWidth,
}) {
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
        sx={(theme) => ({
          marginRight: theme.spacing(2),
          [theme.breakpoints.up("sm")]: {
            marginLeft: drawerWidth,
          },
        })}
      >
        <Clear />
      </IconButton>
      <Typography sx={{ flexGrow: 1 }} variant="body1" noWrap>
        {numberOfSelected} Selected
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCancel}
        sx={(theme) => ({ marginLeft: theme.spacing(1) })}
      >
        Cancel
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleDelete}
        sx={(theme) => ({ marginLeft: theme.spacing(1) })}
      >
        Delete
      </Button>
    </Toolbar>
  );
}
