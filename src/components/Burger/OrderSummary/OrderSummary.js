import React, { Component } from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // this can be a functional component
  componentWillUpdate() {
    console.log("[OrderSummary] willUpdate");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            {igKey}:{" "}
            <span style={{ textTransform: "capitalize" }}>
              {this.props.ingredients[igKey]}
            </span>
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Summary</h3>
        <p>A delicious burger made of...</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)} </strong>
        </p>
        <p>Continue to checkout?</p>

        <Button clicked={this.props.cancelOrder} buttonType="Danger">
          Cancel
        </Button>
        <Button clicked={this.props.confirmOrder} buttonType="Success">
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
