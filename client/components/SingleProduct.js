import React from 'react';
import {getSingleProduct} from '../store/singleProduct'
import {connect} from 'react-redux'

const product = {
    id: 1,
    title: "hat1",
    description: "cool hat",
    price: 20,
    pictureURL: "https://m.media-amazon.com/images/I/713iFk+Yn-L._AC_UL1500_.jpg",
    rating: 4,
    quantity: 50,
}

export class SingleProduct extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            product:{},
        }
    }

    async componentDidMount(){
        await this.props.getProduct(this.props.match.params.productId)
        this.setState({
            product: this.props.singleProduct
        })
    }

    handleClick(){
        console.log('added to cart!') //update with actual funciton to add to cart
    }

    render() {
        const {product} = this.state
        return (
            <div>
                <h1>{product.title}</h1>
                <img className="hatPic" src={product.pictureURL} />
                <p>${product.price / 100}</p>
                <p>{product.description}</p>
                <p>Rating: {product.rating}/5</p>
                <button type='button' onClick={this.handleClick} >Add to cart</button>
            </div>
        )
    }
}

const mapState = (state)=>{
    return {
        singleProduct: state.singleProduct
    }
}

const mapDispatch = (dispatch) =>{
    return {
        getProduct: (id)=>dispatch(getSingleProduct(id))
    }
}

export default connect(mapState, mapDispatch)(SingleProduct)
