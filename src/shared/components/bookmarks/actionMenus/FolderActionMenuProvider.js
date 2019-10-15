import React, { Component } from "react";
import FolderActionMenuContext from "./FolderActionMenuContext";
import FolderActionMenu from "./FolderActionMenu";

export default class FolderActionMenuProvider extends Component {
  state = {
    nodeId: null,
    anchorEl: null,
    setAnchorEl: (el = null, nodeId = null) => {
      this.setState({ anchorEl: el, nodeId });
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
