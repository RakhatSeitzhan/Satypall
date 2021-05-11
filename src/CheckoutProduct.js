import React from 'react'
import {useStateValue} from './StateProvider.js'
function CheckoutProduct({id, title, price, image}) {
    const [{basket}, dispatch] = useStateValue()
    const removeFromBasket = () =>{
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    } 
    return (
        <div className = 'checkoutProduct'>
            <div className = "checkoutProduct__title">{title}</div>
            <div className = "checkoutProduct__price">${price}</div>
            <img src = {image} width = '400px'/>
            <button onClick = {removeFromBasket}>Remove from basket</button> 
        </div>
    )
}

export default CheckoutProduct
