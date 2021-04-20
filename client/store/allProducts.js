import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      dispatch(setProducts(products));
    } catch (error) {
      console.log('Error fetching products from server');
    }
  };
};

export default function allProducts(products = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return products;
  }
}
