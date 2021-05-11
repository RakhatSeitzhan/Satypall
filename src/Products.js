import React from 'react'
import testProducts from './testProducts.js'
import Product from './Product.js'
import Categories from './Categories.js'
import './Products.css'
import {useStateValue} from './StateProvider.js'
function Products() {
    const [{category}] = useStateValue()
    // should be set when cliking on category on home page or when searching
    // then should get all the products suiting the category from the db
    let products = []
    let featured = []
    let rows = []
    testProducts.forEach(item => {
        if (item.category == category.name) products.push(item)
    })
    if (products.length==0) return <h1><Categories/>There are no products with such category</h1>
    // for(var i = 0; i<2; i++) {
    //     featured.push(products[i])
    //     products.splice(i,1)
    // }
    const numInRow = 3
    let currentNum = 0
    let a = []
    while(true) { //distributing products to rows
        a.push(products[0])
        products.splice(0,1)
        currentNum++
        if (currentNum==numInRow || products.length==0){
            rows.push(a)
            a = []
            currentNum = 0
        }
        if (products.length==0) break
    }
    //should select featured products among products list (e.g bestsellers and popular)
    return (
        <div className = 'products'>
            <Categories/>
            <div className = "products__category">{category.name}</div>
            <ProductsRow list = {featured}/>
            {rows.map(row => {
                return (
                    <ProductsRow list = {row}/>
                )
            })}
        </div>
    )
}

function ProductsRow({list}) {
    return (
        <div className = "products__row">
            {list.map(product => {
                return <Product
                    key = {product.id}
                    id = {product.id}
                    title = {product.title}
                    price = {product.price}
                    description = {product.description}
                    image = {product.image}
                />
            })} 
        </div>
    )
}

export default Products
