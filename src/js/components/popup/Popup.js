import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "../helpers/TabPanel";
import NavTabs from "./NavTabs";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Popup() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleChange(_event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <NavTabs value={value} onChange={handleChange}></NavTabs>
      <TabPanel value={value} index={0}>
        First Tab
      </TabPanel>
    </div>
  );
}
