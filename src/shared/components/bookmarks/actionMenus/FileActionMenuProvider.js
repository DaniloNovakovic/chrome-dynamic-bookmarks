import React, { Component } from "react";
import FileActionMenuContext from "./FileActionMenuContext";
import FileActionMenu from "./FileActionMenu";

export default class FileActionMenuProvider extends Component {
  state = {
    anchorEl: null,
    setAnchorEl: el => {
      this.setState({ anchorEl: el });
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
