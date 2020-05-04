import React from "react";

import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import classes from "./Layout.module.css";

const layout = (props) => (
  <Aux>
    <div>
      <Toolbar />
    </div>
    <main className={classes.Main}>{props.children}</main>
  </Aux>
);

export default layout;
