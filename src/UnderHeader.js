import React from 'react'
import './UnderHeader.css'
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom'
import {useStateValue} from './StateProvider.js'
function UnderHeader() {
    const showBar = () => {
        dispatch({
            type: 'SET_MENU_SHOW',
            showMenu: true,
        })
    }
    const [{showMenu},dispatch] = useStateValue()
    return (
        <div className = "UnderHeader">
            <div className = "UnderHeader__option" onClick = {showBar}>
                <MenuIcon/>
                <span>All</span>
            </div>
            <Link className = "UnderHeader__option">
                <span>Sell</span>
            </Link>
            <Link className = "UnderHeader__option">
                <span>Today's best seller</span>
            </Link>
        </div>
    )
}

export default UnderHeader
