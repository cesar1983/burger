import React, { Component } from "react";

import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";

import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <div>
          <Toolbar drawerToggleClicked={this.toggleSideDrawerHandler} />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.toggleSideDrawerHandler}
          />
        </div>
        <main className={classes.Main}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
