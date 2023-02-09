import { toast } from "react-toastify";

export const addToCartHandler = (state, dispatch, product) => {
    const existItem = state.cart.cartItems.find(item => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1; 
    if(product.countInStock < quantity) {
        toast.error('Out Of Stock');
        return;
    }

    dispatch({
        type: 'ADD_TO_CART',
        payload: {
            ...product,
            quantity
        }
    })
    toast.success('Added Successfully');
}

export const removeFromCartHandler = (dispatch, product) => {
    dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    });
    toast.success('Removed Successfully');
}

export const updateCartHandler = (dispatch, product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
}