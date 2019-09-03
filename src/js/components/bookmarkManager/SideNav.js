import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { SideNavContent } from "./SideNavContent";

export class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className={this.props.classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={this.props.direction === "rtl" ? "right" : "left"}
            open={this.props.mobileOpen}
            onClose={this.props.handleDrawerToggle}
            classes={{
              paper: this.props.classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <SideNavContent toolbar={this.props.classes.toolbar} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: this.props.classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <SideNavContent toolbar={this.props.classes.toolbar} />
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}
