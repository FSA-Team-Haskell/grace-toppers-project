import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

let cart = [
  {
    id: 1,
    title: 'tophat',
    price: 5000,
    pictureURL:
      'https://images-na.ssl-images-amazon.com/images/I/61BBPX8VzYL._AC_UX569_.jpg',
  },
];

export class Cart extends React.Component {
  constructor() {
    super();
  }
  // componentDidMount() {
  //   this.props.getCart();
  // }
  render() {
    // if (!this.props.cart.length) {
    //   return <div>Cart is empty</div>;
    // }
    return (
      <div>
        {cart.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img className="hatPic" src={product.pictureURL} />
              <h1>{product.title}</h1>
              <p>${product.price / 100}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
  };
};

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapState, mapDispatch)(Cart);
