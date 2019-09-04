import React, { useState } from "react";
import TabPanel from "../helpers/TabPanel";
import NavTabs from "./NavTabs";
import AddBookmarkForm from "./AddBookmarkForm";

export default function Popup() {
  const [value, setValue] = useState(0);

  function handleChange(_event, newValue) {
    setValue(newValue);
  }

  return (
    <>
      <NavTabs value={value} onChange={handleChange}></NavTabs>
      <TabPanel value={value} index={0}>
        <AddBookmarkForm />
      </TabPanel>
    </>
  );
}
