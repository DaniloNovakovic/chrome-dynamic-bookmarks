import React from "react";
import { Drawer, Hidden } from "@material-ui/core";
import SideNavContent from "./SideNavContent";

export default function SideNav({
  className,
  drawerClassName,
  direction,
  mobileOpen,
  handleDrawerToggle
}) {
  return (
    <nav className={className}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: drawerClassName
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <SideNavContent />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: drawerClassName
          }}
          variant="permanent"
          open
        >
          <SideNavContent />
        </Drawer>
      </Hidden>
    </nav>
  );
}
