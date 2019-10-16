import React, { Component } from "react";
import DialogContext from "./DialogContext";
import DialogReducer from "./DialogReducer";

export default class DialogProvider extends Component {
  state = {
    openedDialogId: null,
    openDialog: (id, args = {}) => {
      this.setState({ openedDialogId: id, args: { ...args } });
    }
  };
  render() {
    return (
      <DialogContext.Provider value={this.state}>
        <DialogReducer />
        {this.props.children}
      </DialogContext.Provider>
    );
  }
}
