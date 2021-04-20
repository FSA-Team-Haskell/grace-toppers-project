import axios from 'axios'

// consts
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// action functions

const gotSingleProduct = (product) =>{
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}


// thunk

export const getSingleProduct = (id) =>{
  return  async (dispatch) =>{
    console.log('dispatching')
    const {data: product } = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(product))
  }
}


const singleProduct = (state={}, action) =>{
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProduct
