import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { SideNavContent } from "./SideNavContent";

export function SideNav({
  className,
  drawerClassName,
  direction,
  mobileOpen,
  handleDrawerToggle
}) {
  return (
    <nav className={className} aria-label="mailbox folders">
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
