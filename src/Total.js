import React from 'react'
import {useStateValue} from './StateProvider'
function Total() {
    const [{basket}] = useStateValue()
    let sum = 0
    basket.forEach(item => {
        sum += item.price
    })
    return (
        <div className = 'total'>
            <div>Total: ${sum}</div>
            {basket.map(item => {
                return <TotalItem 
                title = {item.title}
                price = {item.price}
                />
            })}
            <button>Proceed to payment</button>
        </div>
    )
}

function TotalItem({title, price}) {
    return (
        <div className = 'total__item'>
            <input type = "checkbox"></input>
            <span>{title}</span>
            <span> ${price}</span>
        </div>
    )
}

export default Total
