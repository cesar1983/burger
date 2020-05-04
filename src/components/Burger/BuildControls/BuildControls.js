import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheesseee", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((obj) => (
      <BuildControl
        key={obj.label}
        label={obj.label}
        added={() => props.ingredientAdded(obj.type)}
        removed={() => props.ingredientRemoved(obj.type)}
        disabled={props.disabled[obj.type]}
      />
    ))}
    <br />
    <button
      disabled={!props.purchasable}
      className={classes.OrderButton}
      onClick={props.ordered}
    >
      SHOP NOW
    </button>
  </div>
);

export default buildControls;
