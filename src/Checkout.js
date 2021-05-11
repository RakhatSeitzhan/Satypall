import React from 'react'
import {useStateValue} from './StateProvider.js'
import CheckoutProduct from './CheckoutProduct.js'
import Total from './Total.js'
function Checkout() {
    const [{basket}] = useStateValue()
    return (
        <div className = 'checkout'>
            {basket.map(({id, title, description, price, image}) => {
                return <CheckoutProduct 
                id = {id} 
                title = {title} 
                description = {description} 
                price = {price} 
                image = {image} 
                key = {id}/>
            })}
            <Total/>
        </div>
    )
}

export default Checkout
