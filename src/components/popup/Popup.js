import React, { useState } from "react";
import TabPanel from "../helpers/TabPanel";
import NavTabs from "./NavTabs";
import AddBookmarkForm from "./AddBookmarkForm";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function Popup() {
  const [value, setValue] = useState(0);

  function handleChange(_event, newValue) {
    setValue(newValue);
  }

  return (
    <Box>
      <CssBaseline />
      <NavTabs value={value} onChange={handleChange}></NavTabs>
      <TabPanel value={value} index={0}>
        <AddBookmarkForm />
      </TabPanel>
    </Box>
  );
}
