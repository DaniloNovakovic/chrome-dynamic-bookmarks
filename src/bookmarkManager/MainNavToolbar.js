import React from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { SearchInput } from "shared/components/helpers";
import MainNavMenu from "./MainNavMenu";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));

export default function MainNavToolbar({ handleDrawerToggle, applyFilter }) {
  const classes = useStyles();

  function handleSearchInputChange(searchText) {
    applyFilter({ searchText });
  }

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
