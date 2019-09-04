import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { MainSection } from "./MainSection";
import { SideNav } from "./SideNav";
import { MainNav } from "./MainNav";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  drawerPaper: {
    width: drawerWidth
  }
}));

function Manager() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainNav
        className={classes.appBar}
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideNav
        className={classes.drawer}
        drawerClassName={classes.drawerPaper}
        direction={theme.direction}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MainSection />
    </div>
  );
}

export default Manager;
