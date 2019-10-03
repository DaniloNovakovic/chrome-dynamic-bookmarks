import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { applyFilter } from "shared/store/actions/bookmarkNodesActions";
import SearchInput from "shared/components/helpers/SearchInput";
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

export function MainNav({ className, handleDrawerToggle, applyFilter }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={className}>
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
        <SearchInput onChange={searchText => applyFilter({ searchText })} />
        <MainNavMenu />
      </Toolbar>
    </AppBar>
  );
}

export default connect(
  null,
  { applyFilter }
)(MainNav);
