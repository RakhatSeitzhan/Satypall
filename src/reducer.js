export const initialState = {
    basket: [],
    user: {},
    category: {}
}

function reducer(state, action){
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item] 
            }
            break;
        case 'REMOVE_FROM_BASKET':
            let newBasket = [...state.basket]
            newBasket.splice(newBasket.findIndex(item => item.id == action.id),1)
            return {
                ...state,
                basket: newBasket
            }
            break;  
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
            break;
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.category
            }
    }
}

export default reducer