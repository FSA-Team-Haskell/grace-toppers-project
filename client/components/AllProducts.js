import React from 'react';
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        title: "hat1", 
        description: "cool hat",
        price: 20,
        pictureURL: "https://m.media-amazon.com/images/I/713iFk+Yn-L._AC_UL1500_.jpg",
        rating: 4,
        quantity: 50,
    },
    {
        id: 2,
        title: "hat2", 
        description: "very cool hat",
        price: 30,
        pictureURL: "https://www.rei.com/media/product/193307",
        rating: 5,
        quantity: 40,
    }
]

export class AllProducts extends React.Component {

    render() {
        return(
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <img className="hatPic" src={product.pictureURL} />
                            <h1>{product.title}</h1>
                            <p>${product.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}