import React, { Component } from "react";
import FileActionMenuContext from "./FileActionMenuContext";
import FileActionMenu from "./FileActionMenu";

export default class FileActionMenuProvider extends Component {
  state = {
    nodeId: null,
    anchorEl: null,
    setAnchorEl: (el = null, nodeId = null) => {
      this.setState({ anchorEl: el, nodeId });
    }
  };
  render() {
    return (
      <FileActionMenuContext.Provider value={this.state}>
        <FileActionMenu />
        {this.props.children}
      </FileActionMenuContext.Provider>
    );
  }
}
