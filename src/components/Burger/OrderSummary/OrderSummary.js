import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        {igKey}:{" "}
        <span style={{ textTransform: "capitalize" }}>
          {props.ingredients[igKey]}
        </span>
      </li>
    );
  });

  return (
    <Aux>
      <h3>Summary</h3>
      <p>A delicious burger made of...</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)} </strong>
      </p>
      <p>Continue to checkout?</p>

      <Button clicked={props.cancelOrder} buttonType="Danger">
        Cancel
      </Button>
      <Button clicked={props.confirmOrder} buttonType="Success">
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
