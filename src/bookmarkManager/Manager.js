import React from "react";
import { CssBaseline, Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import MainSection from "./MainSection";
import SideNav from "./SideNav";
import MainNav from "./MainNav";
import {
  FileActionMenuContextProvider,
  FileActionMenu,
  FolderActionMenuContextProvider,
  FolderActionMenu
} from "shared/components/bookmarks";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  mainNav: {
    zIndex: theme.zIndex.drawer + 1
  },
  sideNav: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  mainSection: {
    flexGrow: 1,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(3, 8)
    }
  }
}));

export default function Manager() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <FolderActionMenuContextProvider>
        <FileActionMenuContextProvider>
          <FolderActionMenu />
          <FileActionMenu />
          <MainNav
            className={classes.mainNav}
            handleDrawerToggle={handleDrawerToggle}
          />
          <SideNav
            className={classes.sideNav}
            drawerClassName={classes.drawerPaper}
            direction={theme.direction}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <MainSection className={classes.mainSection} />
        </FileActionMenuContextProvider>
      </FolderActionMenuContextProvider>
    </Box>
  );
}
