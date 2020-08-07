import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { updatedObject, checkValidity } from '../../shared/utility';
import { auth, setAuthRedirectPath } from '../../store/actions';

import FormInput from '../../components/UI/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'E-mail',
        },
        value: '',
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationError: 'Please, enter a valid e-mail',
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        validationError: 'Please, enter your password',
        touched: false,
      },
    },
    isValid: false,
    totalPrice: 0,
    isSignup: true,
  };

  switchAuthModeHandler = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirect !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, elementId) => {
    const updatedControls = updatedObject(this.state.controls, {
      [elementId]: updatedObject(this.state.controls[elementId], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[elementId].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
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
    let formElements = formElementsArr.map((element) => {
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

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirect} />;
    }

    if (this.props.loading) {
      formElements = <Spinner />;
    }

    return (
      <div>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler} className={classes.Auth}>
          {formElements}

          <Button buttonType="Success">
            {this.state.isSignup ? 'Sign up' : 'Sign in'}
          </Button>

          <br />
          <br />
          <Button buttonType="Alert" clicked={this.switchAuthModeHandler}>
            Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </div>
    );
  }
}

const mapsTateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuth: state.authReducer.token !== null,
    buildingBurger: state.burgerReducer.building,
    authRedirect: state.authReducer.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
  };
};

export default connect(mapsTateToProps, mapDispatchToProps)(Auth);
