import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    loading: true,
    orders: [],
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        // console.log("err", err.message);
        this.setState({ lading: false });
      });
  }

  render() {
    let ordersPageContent = <Spinner />;

    if (!this.state.loading) {
      const { orders } = this.state;
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

export default withErrorHandler(Orders, axios);
