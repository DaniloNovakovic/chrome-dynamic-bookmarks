import React, { Component } from "react";

export const FileActionMenuContext = React.createContext();

export class FileActionMenuContextProvider extends Component {
  state = {
    anchorEl: null,
    setAnchorEl: el => {
      this.setState({ anchorEl: el });
    }
  };
  render() {
    return (
      <FileActionMenuContext.Provider value={this.state}>
        {this.props.children}
      </FileActionMenuContext.Provider>
    );
  }
}
