export const addToCartHandler = (state, dispatch, product) => {
    const existItem = state.cart.cartItems.find(item => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1; 
    if(product.countInStock < quantity) {
        alert("Out Of Stock");
        return;
    }

    dispatch({
        type: 'ADD_TO_CART',
        payload: {
            ...product,
            quantity
        }
    })
}

export const removeFromCartHandler = (dispatch, product) => {
    dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })
}

export const updateCartHandler = (dispatch, product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
}