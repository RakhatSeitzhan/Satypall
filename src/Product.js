import React from 'react'
import './Product.css'
import { useStateValue} from './StateProvider.js'
function Product({id, title, price, description, image}) {
    const [{basket}, dispatch] = useStateValue()
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                id: id,
                title: title,
                price: price,
                description: description,
                image: image
            }
        })
    }
    return (
        <div className = "product">
            <div className = "product__title">{title}</div>
            <div className = "product__description">{description}</div>
            <img src = {image}/>
            <div className = "product__price">${price}</div>
            <button onClick = {addToBasket}>Add to basket</button> 
        </div>
    )
}

export default Product
