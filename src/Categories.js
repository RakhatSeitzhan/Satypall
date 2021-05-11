import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {getCategories} from './test.js'
import {useStateValue} from './StateProvider.js'
const allCategories = getCategories()
let previousCategories = []
function Categories() {
    const history = useHistory()
    const [currentCategories, setCurrentCategories] = useState(allCategories)
    const [{},dispatch] = useStateValue()
    const nextPage = (category) => {
        if (category.subCategories!=null) {
            previousCategories.unshift(currentCategories)
            setCurrentCategories(category.subCategories)
        } else {
            let path = ''
            let currentCategory = category
            while(true){
                path = currentCategory.name + '/' + path 
                if (currentCategory.parent == null) break
                currentCategory = currentCategory.parent
            }
            path = '/products/' + path
            dispatch({
                type: 'SET_CATEGORY',
                category: category
            })
            history.push(path)
        }
    }
    const previousPage = () => {
        if (previousCategories.length==0) return
        setCurrentCategories(previousCategories[0])
        previousCategories.splice(0,1)
    }
    return (
        <div className = "categories">
            <button onClick={previousPage}>Prev</button>
            <div className = "categories__page">
            {currentCategories.map(category=>{
                return <div className = "categories__name" onClick = {()=>nextPage(category)}>{category.name}</div>
            })}
            </div>
        </div>
    )
}

export default Categories
