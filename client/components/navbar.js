import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import history from '../history';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleClick, isLoggedIn } = this.props;
    //let currentUrl = this.props.location.split('/')[1] || '';
    return (
      <div>
        <h1>Grace Toppers</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link
                to="/home"
                className={'products' === currentUrl ? 'selected' : ''}
              >
                Home
              </Link>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
              {/* <Link to="/account">Account Info</Link> */}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/home">Home</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
