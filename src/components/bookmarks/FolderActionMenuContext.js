import React, { Component } from "react";

export const FolderActionMenuContext = React.createContext();

export class FolderActionMenuContextProvider extends Component {
  state = {
    anchorEl: null,
    setAnchorEl: el => {
      this.setState({ anchorEl: el });
    }
  };
  render() {
    return (
      <FolderActionMenuContext.Provider value={this.state}>
        {this.props.children}
      </FolderActionMenuContext.Provider>
    );
  }
}
