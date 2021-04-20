import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/allProducts';

const products = [
  {
    id: 1,
    title: 'hat1',
    description: 'cool hat',
    price: 20,
    pictureURL:
      'https://m.media-amazon.com/images/I/713iFk+Yn-L._AC_UL1500_.jpg',
    rating: 4,
    quantity: 50,
  },
  {
    id: 2,
    title: 'hat2',
    description: 'very cool hat',
    price: 30,
    pictureURL: 'https://www.rei.com/media/product/193307',
    rating: 5,
    quantity: 40,
  },
];

export class AllProducts extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    if (!this.props.products) {
      return <div>Loading</div>;
    }
    return (
      <div>
        {this.props.products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img className="hatPic" src={product.pictureURL} />
              <h1>{product.title}</h1>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

const mapState = (state) => {
  return {
    products: state.allProducts,
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
