import React from 'react';
import { connect } from 'react-redux';
import AllProducts from './AllProducts';

/**
 * COMPONENT
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { username } = this.props;
    return (
      <div>
        <h3>Welcome, {username}</h3>
        <AllProducts />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
