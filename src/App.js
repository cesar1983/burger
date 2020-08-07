import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
});

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncBurgerBuilder = asyncComponent(() => {
  return import('./containers/BurgerBuilder/BurgerBuilder');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={asyncBurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={asyncLogout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={asyncBurgerBuilder} />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
