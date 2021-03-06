import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/home';
import { me } from './store';
import SingleProduct from './components/SingleProduct';
import CheckOutPage from './components/CheckOutPage';
import Orders from './components/Orders';
import AccountInfo from './components/AccountInfo';
import history from './history';
import Cart from './components/Cart';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/products" component={Home} />
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
            <Route path="/cart" component={Cart} />
            <Route path="/orders" component={Orders} />
            <Route path="/account" component={AccountInfo} />
            <Route path="/checkout" component={CheckOutPage} />
            <Redirect to="/products" />
          </Switch>
        ) : (
          <Switch>
            {/* <Route path="/" exact component={Login} /> */}
            <Route path="/login" component={Login} />
            <Route exact path="/products" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
            <Route path="/checkout" component={CheckOutPage} />
            <Route path="/cart" component={Cart} />
            <Redirect to="/products" />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey

    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
