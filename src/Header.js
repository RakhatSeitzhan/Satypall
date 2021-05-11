import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import SearchIcon from "@material-ui/icons/Search"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import {useStateValue} from './StateProvider.js'
import {auth} from './firebase.js'
function Header() {
    const [{user, basket}] = useStateValue()
    const login = () => {
        if (user){
            auth.signOut()
        }
    }
    return (
        <div className = "header">
            <Link to = '/'>
                <img src = "Logo.svg" className = 'header__logo'/>
            </Link> 
            <div className = "header__search">
                <input type="text" className = "header__searchInput" />
                <SearchIcon className = "header__searchIcon"/>
            </div>
            <div className = "header__nav">
                <Link to={user ? '/' : '/login'} className = "header__link">
                    <span className = "header__option" onClick = {login}>{user ? 'Logout' : 'Login'}</span>
                </Link>
                <Link to={user ? '/checkout' : '/login'} className = "header__link">
                    <span className = "header__option">
                        <ShoppingBasketIcon/>
                        <span> {basket.length}</span>
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Header
