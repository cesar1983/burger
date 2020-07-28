import React, { Component } from "react";
import FormInput from "../../components/UI/FormInput/FormInput";
import Button from "../../components/UI/Button/Button";

import { connect } from "react-redux";
import { auth } from "../../store/actions";

import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationError: "Please, enter a valid e-mail",
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        validationError: "Please, enter your password",
        touched: false,
      },
    },
    isValid: false,
    totalPrice: 0,
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

    if (rules.email) {
      const regexp = new RegExp(
        "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+"
      );
      isValid = regexp.test(trimedValue) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, elementId) => {
    const updatedControls = {
      ...this.state.controls,
      [elementId]: {
        ...this.state.controls[elementId],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[elementId].validation
        ),
        touched: true,
      },
    };

    this.setState({ controls: updatedControls });

    console.log(this.state.controls);
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    // Transforma o objeto acima em um array pra poder iterar com map
    const formElementsArr = [];
    for (let key in this.state.controls) {
      formElementsArr.push({
        id: key,
        config: this.state.controls[key],
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
    return (
      <div>
        <form onSubmit={this.submitHandler} className={classes.Auth}>
          {formElements}

          <Button>Submit</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
