import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { destoryCart, fetchCart, _updateCart, checkout } from "../store/cart";
import history from "../history";

export class Cart extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }
  componentDidMount() {
    this.props.getCart();
    // this.props.cart.reduce(
    //   (accum, { product, quantityInCart }) => {
    //     accum += product.price * quantityInCart;
    //     return accum;
    //   },
    //   0
    // );
  }

  handleCheckout(evt) {
    console.log(this.props.cart);
    if (!this.props.isLoggedIn) {
      if (window.confirm("Please sign up to checkout")) {
        this.props.history.push("/signup");
      }

      return;
    }
    for (let i = 0; i < this.props.cart.length; i++) {
      if (
        !this.props.cart[i].quantityInCart ||
        this.props.cart[i].quantityInCart === "0"
      ) {
        window.alert("Item with quantity 0 in cart - please update or remove.");
        return;
      }
    }
    if (!this.props.cart.length) return;
    this.props.checkout(this.props.cart);
  }

  handleDelete(id) {
    this.props.deleteItem(id);
  }

  handleChange(evt) {
    let quantity = evt.target.value;
    let id = evt.target.id;
    this.props.updateItem(quantity, id);
    this.setState({
      state: this.newState,
    });
  }

  render() {
    if (!this.props.cart || !this.props.cart.length) {
      return <div>Cart is empty</div>;
    }
    const cart = this.props.cart;
    let total = cart.reduce((accum, { product, quantityInCart }) => {
      accum += product.price * quantityInCart;
      return accum;
    }, 0);
    return (
      <React.Fragment>
        <div id="total">
          <strong>Total: ${total / 100}</strong>
          <button onClick={this.handleCheckout} id="checkout">
            Checkout
          </button>
        </div>
        <div id="cart-items">
          {cart.map(({ product, cartId, quantityInCart }, index) => {
            this.newState = product.price * quantityInCart;
            return (
              <div key={index} id="item">
                <Link to={`/products/${product.id}`}>
                  <img className="hatPic" src={product.pictureURL} />
                  <h1 id="title">{product.title}</h1>
                </Link>
                <p>${product.price / 100}</p>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  name="quantity"
                  type="number"
                  min="0"
                  id={cartId}
                  //value={quantityInCart}
                  placeholder={quantityInCart}
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <button
                  type="button"
                  id="delete"
                  onClick={() => this.handleDelete(product.id)}
                >
                  Remove from cart
                </button>
              </div>
            );
          })}
          <br />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCart()),
    deleteItem: id => dispatch(destoryCart(id)),
    updateItem: (quantity, id) => dispatch(_updateCart(quantity, id)),
    checkout: cart => dispatch(checkout(cart)),
    loadInitialData() {
      dispatch(me());
    },
  };
};

const mapState = (state, otherProps) => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
    history: otherProps.history,
  };
};

export default connect(mapState, mapDispatch)(Cart);
