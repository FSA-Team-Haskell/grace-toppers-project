import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import history from '../history';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      location: history.location.pathname
    }
  }
  handleClick(event){
    const curLocation = history.location.pathname.split('/')[1]
    this.setState({location:event.target.name})
  }
  render() {
    const { handleClick:logOut, isLoggedIn } = this.props;
    const location = history.location.pathname
    let homeCondition = '/home' === location || '/products' === location
    return (
      <div>
        <h1>Grace Toppers</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link
                name='/home'
                onClick={this.handleClick}
                to="/home"
                className={ homeCondition ? 'selected' : ''}
              >
                Home
              </Link>
              <Link
              to="/cart"
              name='/cart'
              onClick={this.handleClick}
              className={'/cart' === location ? 'selected' : ''}
              >Cart</Link>

              <Link
              to="/orders"
              name='/orders'
              onClick={this.handleClick}
              className={'/orders' === location ? 'selected' : ''}
              >Orders</Link>
              {/* <Link to="/account">Account Info</Link> */}
              <a href="#"
              onClick={logOut}
              >
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/home" onClick={this.handleClick} name='/home'
              className={homeCondition ? 'selected' : ''}
              >Home</Link>

              <Link to="/cart" onClick={this.handleClick} name='/cart'
              className={'/cart' === location ? 'selected' : ''}
              >Cart</Link>
              <Link to="/login" onClick={this.handleClick} name='/login'
              className={'/login' === location ? 'selected' : ''}
              >Login</Link>
              <Link to="/signup" onClick={this.handleClick} name='/signup'
              className={'/signup' === location ? 'selected' : ''}
              >Sign Up</Link>
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
