import React, { Component } from "react";

import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import { connect } from "react-redux";

class Checkout extends Component {
  // state = {
  //   ingredients: {},
  //   totalPrice: 0,
  // };

  componentWillMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // let price = 0;
    // for (let param of query.entries()) {
    //   if (param[0] === "price") price = param[1];
    //   else ingredients[param[0]] = +param[1];
    // }
    // // console.log(ingredients);
    // this.setState({ ingredients: ingredients, totalPrice: price });
  }

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  handleContinueButton = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    // console.log(this.state);
    // const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          handleCancelButtonClick={this.handleCancelButton}
          handleContinueButtonClick={this.handleContinueButton}
          ingredients={this.props.ings}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
        {/* <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.props.ings}
              totalPrice={this.props.price}
              {...props}
            />
          )}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
