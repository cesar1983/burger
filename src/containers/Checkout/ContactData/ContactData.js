import React, { Component } from "react";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/WithErrorHandler";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import FormInput from "../../../components/UI/FormInput/FormInput";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        validationError: "Please, enter a valid name",
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        validationError: "Please, enter a valid e-mail",
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        validationError: "Please, enter a valid street name",
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        validationError: "Please, enter a valid city name",
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        validationError: "Please, enter a valid Zip code",
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        validationError: "Please, enter a valid country name",
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", label: "Fastest" },
            { value: "cheapest", label: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    isValid: false,
    totalPrice: 0,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdenfitifer in this.state.orderForm) {
      formData[formElementIdenfitifer] = this.state.orderForm[
        formElementIdenfitifer
      ].value;
    }

    const order = {
      orderData: formData,
      ingredients: this.props.ings,
      price: this.props.price,
    };

    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, elementId) => {
    const updatedForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedForm[elementId] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;
    updatedForm[elementId] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedForm, isValid: formIsValid });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    const trimedValue = value.trim();

    if (rules.required) {
      isValid = trimedValue !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = trimedValue.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = trimedValue.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  render() {
    // Transforma os campos do objeto acima em um array pra poder iterar com map
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    const formElements = formElementsArr.map((element) => {
      return (
        <FormInput
          key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.value}
          shouldBeValidated={element.config.validation}
          invalid={!element.config.valid}
          touched={element.config.touched}
          validationError={element.config.validationError}
          changed={(event) => this.inputChangedHandler(event, element.id)}
        />
      );
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}

        <Button buttonType="Success" disabled={!this.state.isValid}>
          Order
        </Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    loading: state.orderReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => {
      dispatch(actions.purchaseBurger(orderData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
