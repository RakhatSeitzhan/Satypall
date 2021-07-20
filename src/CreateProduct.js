import React, {useState, useRef}from 'react'
import {db} from './firebase.js'
import {getCategories} from './test.js'
const allCategories = getCategories()
function CreateProduct() {


    /// make image upload and get from the database


    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating]  = useState('')
    const [category, setCategory]  = useState('')
    const [image, setImage] = useState()
    const imageElementRef = useRef()
    const changeName = (e) => {
        setName(e.target.value)
    }
    const changePrice = (e) => {
        setPrice(e.target.value)
    }
    const changeRating = (e) => {
        setRating(e.target.value)
    }
    const changeCategory = (e) => {
        setCategory(e.target.value)
    }
    const changeImage = (e) => {
        setImage(e.target.value)
        console.log(imageElementRef.current.value.type)
    }
    const createProduct = () => {
        console.log(`should have made a product with props: name - ${name}, price - ${price}$, raing - ${rating}`)
        let path = []
        let active = [...allCategories.subCategories]
        while(active[0].name != category){
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
        const newProd = {
            name: name,
            price: Number(price),
            rating: Number(rating),
            category: path.join(' '),
            image: image,
        }
        var metadata = {
            contentType: 'image/jpeg',
          };
          
          // Upload the file and metadata
        db.collection('Products/'+path.join('/')).add(newProd)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
        // db.collection(path).add({
        //     name: name,
        //     price: Number(price),
        //     rating: Number(rating)
        // })
        // .then((docRef) => {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch((error) => {
        //     console.error("Error adding document: ", error);
        // });
    }
    return (
        <div>
            <h4>Name</h4>
            <input type="text" value = {name} onChange = {changeName}></input>
            <h4>Price</h4>
            <input type="text" value = {price} onChange = {changePrice}></input>
            <h4>Rating</h4>
            <input type="text" value = {rating} onChange = {changeRating}></input>
            <h4>Category</h4>
            <input type="text" value = {category} onChange = {changeCategory}></input>
            <h4>Image URL</h4>
            <input type="text" ref = {imageElementRef} value = {image} onChange = {changeImage}></input>
            <button onClick = {createProduct}>Create new</button>
        </div>
    )
}

export default CreateProduct
