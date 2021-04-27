import React from 'react';
import axios from 'axios';
import dateformat from 'dateformat';

export default class Orders extends React.Component {
    constructor() {
      super();
      this.state = {
          orders: [],
      }
    }
    async componentDidMount() {
        const token = window.localStorage.getItem('token');
        const sendData = {
            headers: {
            authorization: token,
            },
        }
        const {data: orders} = await axios.get(`/api/orders/`, sendData);
        this.setState({orders: orders})
    }
    render() {
      if (!this.state.orders.length) {
        return <div>No Past Orders</div>;
      }

      return (
        <div id="all-orders">
          {this.state.orders.map((order) => (
            <div id="individual-order" key={order.id}>
                <h2>Order Date: {dateformat(order.date)}</h2>
                <h2>Total Cost: ${order.totalCost/100}</h2>
                {order.carts.map((cart) => (
                    <div key={cart.id}>
                        <img className="hatPic" src={cart.product.pictureURL} />
                        <h1 id='title'>{cart.product.title}</h1>
                        <p>Quantity: {cart.quantity}</p>
                        <p>${cart.product.price / 100}</p>
                    </div>
                ))}
            </div>
          ))}
        </div>
      );
    }
  }
  