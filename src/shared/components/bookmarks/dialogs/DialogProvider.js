import React, { Component } from "react";
import DialogContext from "./DialogContext";
import DialogReducer from "./DialogReducer";

export default class DialogProvider extends Component {
  state = {
    openedDialogId: null,
    openDialog: id => {
      this.setState({ openedDialogId: id });
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
