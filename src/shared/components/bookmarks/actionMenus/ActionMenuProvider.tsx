import React, { Component } from "react";

import ActionMenuContext from "./ActionMenuContext";
import ActionMenuReducer from "./ActionMenuReducer";

export default class ActionMenuProvider extends Component {
  state = {
    openedActionMenuId: null,
    openActionMenu: (id, args = {}) => {
      this.setState({ openedActionMenuId: id, args: { ...args } });
    },
  };
  render() {
    return (
      <ActionMenuContext.Provider value={this.state}>
        <ActionMenuReducer />
        {this.props.children}
      </ActionMenuContext.Provider>
    );
  }
}
