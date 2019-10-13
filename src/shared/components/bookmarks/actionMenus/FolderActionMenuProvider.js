import React, { Component } from "react";
import FolderActionMenuContext from "./FolderActionMenuContext";
import FolderActionMenu from "./FolderActionMenu";

export default class FolderActionMenuProvider extends Component {
  state = {
    anchorEl: null,
    setAnchorEl: el => {
      this.setState({ anchorEl: el });
    }
  };
  render() {
    return (
      <FolderActionMenuContext.Provider value={this.state}>
        <FolderActionMenu />
        {this.props.children}
      </FolderActionMenuContext.Provider>
    );
  }
}
