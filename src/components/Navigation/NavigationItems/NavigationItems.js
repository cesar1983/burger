import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem active link="/">
      Burger
    </NavigationItem>
    <NavigationItem link="/">Check out</NavigationItem>
  </ul>
);

export default navigationItems;
