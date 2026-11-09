import React, { Component } from "react";

import DialogContext from "./DialogContext";
import DialogReducer from "./DialogReducer";

type DialogProviderProps = {
  children?: React.ReactNode;
};

export default class DialogProvider extends Component<DialogProviderProps> {
  state = {
    openedDialogId: null,
    openDialog: (id, args = {}) => {
      this.setState({ openedDialogId: id, args: { ...args } });
    },
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
