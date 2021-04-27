import React from "react";
import axios from "axios";
import dateformat from "dateformat";

export default class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }
  async componentDidMount() {
    const token = window.localStorage.getItem("token");
    const sendData = {
      headers: {
        authorization: token,
      },
    };
    const { data: orders } = await axios.get(`/api/orders/`, sendData);
    this.setState({ orders: orders });
  }
  render() {
    if (!this.state.orders.length) {
      return <div>No Past Orders</div>;
    }

    return (
      <div id='order-page'>
        {this.state.orders.map(order => (
          <div key={order.id}>
            <div className="order">
              <div>Total Cost: ${order.totalCost / 100}</div>
              <div>Order Date: {dateformat(order.date)}</div>
            </div>
            <div id="all-items">
              {order.carts.map(cart => (
                <div key={cart.id} id="individual-products">
                  <img className="hatPic" src={cart.product.pictureURL} />
                  <h1 id="title">{cart.product.title}</h1>
                  <p>Quantity: {cart.quantity}</p>
                  <p>${cart.product.price / 100}</p>
                </div>
              ))}
            </div>
          </div>
        )).reverse()}
      </div>
    );
  }
}
