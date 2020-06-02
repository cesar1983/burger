import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
    },
    totalPrice: 0,
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);

    this.setState({ loading: true });
    const order = {
      customer: {
        name: "Cesar Almeida",
        email: "cesar.fa@gmail.com",
        address: {
          street: "Rua Aleee 12",
          zipCode: "12115",
          country: "BR",
        },
      },
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      deliveryMethod: "normal",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        // console.log("response", response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        // console.log("Error", error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          name="name"
          className={classes.Input}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          className={classes.Input}
          placeholder="E-mail"
        />
        <input
          type="text"
          name="street"
          className={classes.Input}
          placeholder="Street"
        />
        <input
          type="text"
          name="zipCode"
          className={classes.Input}
          placeholder="Zip Code"
        />
        <Button buttonType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Customer Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
