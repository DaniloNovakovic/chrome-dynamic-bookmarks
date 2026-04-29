import { Box, CssBaseline } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import React from "react";

import {
  ActionMenuProvider,
  DialogProvider,
} from "@/shared/components/bookmarks";
import SelectedNodesKeyHandler from "@/shared/components/bookmarks/SelectedNodesKeyHandler";
import { StatusSnackbar } from "@/shared/components/helpers";

import MainNav from "./MainNav";
import MainSection from "./MainSection";
import SideNav from "./SideNav";

type StyleProps = {
  drawerWidth: number;
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    display: "flex",
  },
  mainNav: {
    zIndex: theme.zIndex.drawer + 1,
  },
  sideNav: {
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }) => drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: ({ drawerWidth }) => drawerWidth,
  },
  mainSection: {
    flexGrow: 1,
    minHeight: "100vh",
    padding: theme.spacing(3, 4),
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }) => `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(3, 8),
    },
  },
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
    <DialogProvider>
      <ActionMenuProvider>
        <CssBaseline />
        <StatusSnackbar />
        <SelectedNodesKeyHandler />
        <Box className={classes.root}>
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
        </Box>
      </ActionMenuProvider>
    </DialogProvider>
  );
}
