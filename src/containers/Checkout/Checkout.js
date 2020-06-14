import React, { Component } from "react";

import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") price = param[1];
      else ingredients[param[0]] = +param[1];
    }
    // console.log(ingredients);
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  handleContinueButton = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    // console.log(this.state);
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          handleCancelButtonClick={this.handleCancelButton}
          handleContinueButtonClick={this.handleContinueButton}
          ingredients={ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
