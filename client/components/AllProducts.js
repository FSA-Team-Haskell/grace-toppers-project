import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";

export class AllProducts extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    if (!this.props.products.length) {
      return <div>Loading</div>;
    }
    return (
      <div>
        {this.props.products.map(product => (
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

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

const mapState = state => {
  return {
    products: state.allProducts,
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
