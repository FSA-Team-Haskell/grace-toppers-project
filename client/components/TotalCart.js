import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class TotalCart extends React.Component {
  constructor() {
    super();
  }
  render() {
    totalCost = this.props.cart.reduce((accum, { product, quantityInCart }) => {
      accum += product.price * quantityInCart;
      return accum;
    }, 0);
    return (
      <div id="total">
        <strong>Total: </strong>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapState)(TotalCart);
