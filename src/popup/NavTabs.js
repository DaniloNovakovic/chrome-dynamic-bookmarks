import React from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs } from "@material-ui/core";
import { LinkTab } from "shared/components/helpers";

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

export default function NavTabs(props) {
  return (
    <AppBar position="static">
      <Tabs
        variant="scrollable"
        scrollButtons="on"
        value={props.value}
        onChange={props.onChange}
        aria-label="Navigation Tabs"
        indicatorColor="primary"
      >
        <LinkTab label="Add Bookmark" {...a11yProps(0)} />
        <LinkTab
          label="Open Manager"
          href="bookmarkManager.html"
          target="_blank"
          rel="noopener"
          {...a11yProps(1)}
        />
      </Tabs>
    </AppBar>
  );
}

NavTabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
