import React from 'react';

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
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log('added to cart!') //update with actual funciton to add to cart
    }

    render() {
        return (
            <div>
                <h1>{product.title}</h1>
                <img className="hatPic" src={product.pictureURL} />
                <p>${product.price}</p>
                <p>{product.description}</p>
                <p>Rating: {product.rating}/5</p>
                <button type='button' onClick={this.handleClick} >Add to cart</button>
            </div>
        )
    }
}