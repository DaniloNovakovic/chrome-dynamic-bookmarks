import React from "react";
import { CssBaseline, Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import MainSection from "./MainSection";
import SideNav from "./SideNav";
import MainNav from "./MainNav";
import {
  FolderActionMenuProvider,
  DialogProvider,
  ActionMenuProvider
} from "shared/components/bookmarks";
import { StatusSnackbar } from "shared/components/helpers";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  mainNav: {
    zIndex: theme.zIndex.drawer + 1
  },
  sideNav: {
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }) => drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: ({ drawerWidth }) => drawerWidth
  },
  mainSection: {
    flexGrow: 1,
    minHeight: "100vh",
    padding: theme.spacing(3, 4),
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }) => `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(3, 8)
    }
  }
}));

export default function Manager() {
  const [drawerWidth] = React.useState(240);
  const classes = useStyles({ drawerWidth });
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <StatusSnackbar />
      <DialogProvider>
        <ActionMenuProvider>
          <MainNav
            className={classes.mainNav}
            drawerWidth={drawerWidth}
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
        </ActionMenuProvider>
      </DialogProvider>
    </Box>
  );
}
