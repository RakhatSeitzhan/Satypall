import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import Categories from './Categories.js'

function Home() {
    return (
        <div className = "home">
            <Categories/>
            <Link to='/products' className = "header__link">
                <span>To products</span>
            </Link>
        </div>
    )
}

export default Home
