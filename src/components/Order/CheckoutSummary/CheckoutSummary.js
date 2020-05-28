import React from "react";

import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.module.css";
import Button from "../../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hummm, Delicious!</h1>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked buttonType="Danger">
        Cancel
      </Button>
      <Button clicked buttonType="Success">
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
