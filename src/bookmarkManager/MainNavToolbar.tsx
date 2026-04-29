import { IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useCallback } from "react";

import { SearchInput } from "@/shared/components/helpers";

import MainNavMenu from "./MainNavMenu";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

let oldParentId;

export default function MainNavToolbar({
  handleDrawerToggle,
  filter,
  applyFilter,
}) {
  const classes = useStyles();

  const handleSearchInputChange = useCallback(
    (searchText) => {
      if (!searchText) {
        applyFilter({ parentId: oldParentId || filter.parentId });
      } else {
        oldParentId = filter.parentId;
        applyFilter({ searchText });
      }
    },
    [applyFilter, filter.parentId]
  );

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Typography className={classes.title} variant="h6" noWrap>
        Dynamic Bookmarks
      </Typography>
      <SearchInput onChange={handleSearchInputChange} />
      <MainNavMenu />
    </Toolbar>
  );
}
