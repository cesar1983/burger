import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import FormInput from "../../../components/UI/FormInput/FormInput";

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
        value: "",
      },
    },
    totalPrice: 0,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};
    for (let formElementIdenfitifer in this.state.orderForm) {
      formData[formElementIdenfitifer] = this.state.orderForm[
        formElementIdenfitifer
      ].value;
    }
    console.log("formData", formData);
    const order = {
      orderData: formData,
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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

    // console.log(updatedFormElement);

    this.setState({ orderForm: updatedForm });
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

        <Button buttonType="Success">Order</Button>
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
