import React, {useState, useRef, useEffect} from 'react'
import './Menu.css'
import {useHistory} from 'react-router-dom'
import {getCategories} from './test.js'
import {useStateValue} from './StateProvider.js'
import CloseIcon from '@material-ui/icons/Close';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';

const allCategories = getCategories()
const pages = [allCategories,...allCategories.subCategories]
function Menu() {
    const history = useHistory()
    const [{showMenu},dispatch] = useStateValue()
    const [currentPageId, setCurrentPageId] = useState(0)
    const hideBar = (e) => {
        dispatch({
            type: 'SET_MENU_SHOW',
            showMenu: false,
        })
    }
    const nextPage = (category) => {
        if (category.subCategories == null) {
            let path = ''
            let currentCategory = category
            while(currentCategory.parent == null){
                path = currentCategory.name + '/' + path 
                currentCategory = currentCategory.parent
            }
            path = '/products/' + path
            dispatch({
                type: 'SET_CATEGORY',
                category: category
            })
            history.push(path)
            return
        } 
        setCurrentPageId(selectPage(category))
    }
    const previousPage = () => {
        if (pages[currentPageId].parent == null) return 
        setCurrentPageId(selectPage(pages[currentPageId].parent))
    }
    return (
        <div className = "menu" shown = {String(showMenu)}>
            <div className = "menu__container"  shown = {String(showMenu)}>
                <ArrowIcon onClick={previousPage} className="menu__prevButton"/>
                <div className = "menu__pagesContainer">   
                    {pages.map(page=>{
                        let translateLeft = false
                        let translateRight = true
                        if (selectPage(page) == currentPageId) {
                            translateLeft = false
                            translateRight = false
                        }
                        if (page == pages[currentPageId].parent) {
                            translateLeft = true
                            translateRight = false
                        }
                        return(
                            <div className = "menu__page" 
                            pageId = {page.id}
                            translateLeft = {String(translateLeft)}
                            translateRight = {String(translateRight)}
                            >
                                {page.subCategories.map(category=>{
                                    return  <div className = "menu__name" onClick = {()=>nextPage(category)}>
                                                {category.name}
                                            </div>
                                })}
                            </div>
                        )
                    })}
                </div> 
                <CloseIcon width = "40px" className="menu__closeButton" onClick={hideBar} />
            </div>
            <div className = "menu__background" onClick={hideBar}></div>
        </div>
    )
}
function selectPage(page){
    for (var i in pages) if (pages[i] == page) return i
    return null
}

export default Menu