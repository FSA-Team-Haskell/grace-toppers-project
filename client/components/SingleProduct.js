import React from 'react';
import { getSingleProduct } from '../store/singleProduct';
import { connect } from 'react-redux';
import axios from 'axios';
import { destoryCart, fetchCart, _updateCart } from '../store/cart';

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      product: {},
    };
  }

  async componentDidMount() {
    this.props.getCart();
    await this.props.getProduct(this.props.match.params.productId);
    this.setState({
      product: this.props.singleProduct,
    });
  }

  async handleClick(productId) {
    const check = this.props.cart.filter((item) => {
      return item.product.id === productId;
    });
    if (check[0]) {
      window.alert('Item already in cart!');
      return;
    }
    const token = window.localStorage.getItem('token');
    const sendData = {
      headers: {
        authorization: token,
      },
    };
    await axios.post(`/api/cart/`, { productId }, sendData);
    window.alert('Added to cart!');
  }

  render() {
    const { product } = this.state;
    let ratingHtml = []
    for (let i=1; i <= product.rating; i++){
      ratingHtml.push(<img id='star' src="https://img.icons8.com/material-outlined/48/000000/filled-star.png"/>)
    }
    return (
      <div id='singleProduct'>

        <img className="hatPic" src={product.pictureURL} id="product-image" />
        <div id='description'>
        <h1>{product.title}</h1>
        <p className='price'>${product.price / 100}</p>
        <p>{product.description}</p>
        <p id='rating'>Rating: {ratingHtml[0] ? ratingHtml.map(star=>star): 'No Ratings'}</p>
        <button type="button" className='single-page-delete' onClick={() => this.handleClick(product.id)}>
          Add to cart
        </button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
    getProduct: (id) => dispatch(getSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
