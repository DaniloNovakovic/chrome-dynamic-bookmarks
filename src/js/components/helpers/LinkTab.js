import React from "react";
import Tab from "@material-ui/core/Tab";

export default function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        if (props.target !== "_blank") {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}
