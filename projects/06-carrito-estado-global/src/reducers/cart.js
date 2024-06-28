export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []


const updateLocalStorageCart = (cart) => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
}


const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}


const UPDATE_STATE_CART_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state, payload) => {
        const { id } = payload;
        const productInCart = state.findIndex(item => item.id === id)

        if (productInCart >= 0){
            const newCart = structuredClone(state)
            newCart[productInCart].quantity += 1
            
            updateLocalStorageCart(newCart)

            return newCart
        }
        
        const newCart = [
            ...state,
            {
                ...payload,
                quantity: 1
            }
        ]

        updateLocalStorageCart(newCart)

        return newCart
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, payload) => {
        const { id } = payload
        const productInCart = state.findIndex(item => item.id === id)
        if (productInCart < 0) throw new Error('Product not found in cart')

        const newCart = structuredClone(state)
        if (newCart[productInCart].quantity === 1) {
            newCart.splice(productInCart, 1)
            return newCart
        }

        newCart[productInCart].quantity -= 1
        updateLocalStorageCart(newCart)

        return newCart
    },
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
        updateLocalStorageCart([])

        return []
    }
}


export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action
    
    const updateState = UPDATE_STATE_CART_BY_ACTION[actionType]

    return updateState ? updateState(state, actionPayload) : state
}