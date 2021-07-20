import Reactm, {useState, useEffect} from 'react'
import testProducts from './testProducts.js'
import Product from './Product.js'
import './Products.css'
import {useStateValue} from './StateProvider.js'
import {db} from './firebase.js'

import {getCategories} from './test.js'
const allCategories = getCategories()
function getPath(category){
    let path = []
    let active = [...allCategories.subCategories]
    while(active[0].name != category.name){
        if (active[0].subCategories != null) 
            for (var i in active[0].subCategories)
                active.push(active[0].subCategories[i])
        active.splice(0,1)
    }
    let current = active[0]
    while (current.parent != null){
        path.push(current.name)
        current = current.parent 
    }
    path.reverse()
    path = "Products/"+path.join('/')
    return path
}
function Products() {
    const [{category}] = useStateValue()
    const [data, setData] = useState([])
    let products = [...data]
    let featured = []
    let rows = []
    useEffect(() => {
        db.collection(getPath(category)).get().then((querySnapshot) => {
            let list = []
            querySnapshot.forEach((doc) => {
                list.push(doc.data())
            });
            setData(list)
        });
    }, [])
    if (products.length==0) return <h1>There are no products with such category</h1>
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
    // testProducts.forEach(item => {
    //     if (item.category == category.name) products.push(item)
    // })
    // if (products.length==0) return <h1>There are no products with such category</h1>
    // const numInRow = 3
    // let currentNum = 0
    // let a = []
    // while(true) { //distributing products to rows
    //     a.push(products[0])
    //     products.splice(0,1)
    //     currentNum++
    //     if (currentNum==numInRow || products.length==0){
    //         rows.push(a)
    //         a = []
    //         currentNum = 0
    //     }
    //     if (products.length==0) break
    // }
    //should select featured products among products list (e.g bestsellers and popular)
    return (
        <div className = 'products'>
            <div className = "products__category">{category.name}</div>
            <ProductsRow list = {featured}/>
            {rows.map(row => {
                return (
                    <ProductsRow list = {row} key = {row[0].id}/>
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
                    title = {product.name}
                    price = {product.price}
                    description = {product.description}
                    image = {product.image}
                />
            })} 
        </div>
    )
}

export default Products
