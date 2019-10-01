import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import MainSection from "./MainSection";
import SideNav from "./SideNav";
import MainNav from "./MainNav";
import { FileActionMenuContextProvider } from "components/bookmarks/FileActionMenuContext";
import FileActionMenu from "components/bookmarks/FileActionMenu";
import { FolderActionMenuContextProvider } from "components/bookmarks/FolderActionMenuContext";
import FolderActionMenu from "components/bookmarks/FolderActionMenu";

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
