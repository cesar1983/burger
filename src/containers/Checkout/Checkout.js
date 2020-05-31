import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {},
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    console.log(ingredients);
    this.setState({ ingredients: ingredients });
  }

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  handleContinueButton = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log(this.state);
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          handleCancelButtonClick={this.handleCancelButton}
          handleContinueButtonClick={this.handleContinueButton}
          ingredients={ingredients}
        />
      </div>
    );
  }
}

export default Checkout;
