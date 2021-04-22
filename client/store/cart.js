import axios from 'axios';

const SET_CART = 'SET_CART';

export const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const sendData = {
        headers: {
          authorization: token
        },
      };
      const { data: cart } = await axios.get('/api/cart', sendData);
      dispatch(setCart(cart));
      console.log('cart data form server-->', cart)
    } catch (error) {
      console.log('Error fetching cart from server');
    }
  };
};

export default function cart(cart = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return cart;
  }
}
