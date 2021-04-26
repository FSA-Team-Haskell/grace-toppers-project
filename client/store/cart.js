import axios from 'axios';

const SET_CART = 'SET_CART';
const DELETE_CART = 'DELETE_CART';
const UPDATE_CART = 'UPDATE_CART';
const CHECKED_OUT = 'CHECKED_OUT';

export const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const deleteCart = (id) => ({
  type: DELETE_CART,
  id,
});

export const updateCart = (quantity, id) => ({
  type: UPDATE_CART,
  quantity,
  id,
});

export const checkedOut = (cart) => ({
  type: CHECKED_OUT,
});

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const sendData = {
        headers: {
          authorization: token,
        },
      };
      const { data: cart } = await axios.get('/api/cart', sendData);
      dispatch(setCart(cart));
    } catch (error) {
      console.log('Error fetching cart from server');
    }
  };
};

export const destoryCart = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const sendData = {
        headers: {
          authorization: token,
        },
      };
      await axios.delete(`/api/cart/${id}`, sendData);
      dispatch(deleteCart(id));
    } catch (error) {
      console.log('Error deleting');
    }
  };
};

export const _updateCart = (quantity, id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const sendData = {
        headers: {
          authorization: token,
        },
      };
      const body = {
        quantity: quantity,
        cartId: id,
      };
      await axios.put(`/api/cart`, body, sendData);
      dispatch(updateCart(quantity, id));
    } catch (error) {
      console.log('Error updating');
    }
  };
};

export const checkout = (cart) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const sendData = {
        headers: {
          authorization: token,
        },
      };
      const body = {
        cart: cart,
      };
      await axios.put(`/api/checkout`, body, sendData);
      dispatch(checkedOut(cart));
    } catch (error) {
      console.log('Error during checkout!');
    }
  }
}

export default function cart(cart = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case DELETE_CART:
      return cart.filter((item) => item.product.id !== Number(action.id));
    case UPDATE_CART:
      return cart.map((product) => {
        if (product.cartId === Number(action.id)) {
          product.quantityInCart = action.quantity;
        }
        return product;
      });
    case CHECKED_OUT:
      return [];
    default:
      return cart;
  }
}
