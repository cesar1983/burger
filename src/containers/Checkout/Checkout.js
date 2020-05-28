import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={{ salad: 1, meat: 1, cheese: 1 }} />
      </div>
    );
  }
}

export default Checkout;
