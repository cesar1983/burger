import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  state = {
    loading: true,
    orders: [],
  };

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let ordersPageContent = <Spinner />;

    if (!this.props.loading) {
      const { orders } = this.props;
      ordersPageContent = orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }

    return <div>{ordersPageContent}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.orderReducer.loading,
    orders: state.orderReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
