import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { connect } from 'react-redux';

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
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            handleCancelButtonClick={this.handleCancelButton}
            handleContinueButtonClick={this.handleContinueButton}
            ingredients={this.props.ings}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </>
      );
    }

    return (
      <div>
        {summary}
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
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    purchased: state.orderReducer.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
