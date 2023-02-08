import Cookies from "js-cookie";

export const addToCart = (state, newItem) => {
    const existItem = state.cart.cartItems.find(item => item.slug == newItem.slug);
    
    const cartItems = existItem? 
            state.cart.cartItems.map(item => item.slug === existItem.slug? newItem : item)
            : [ ...state.cart.cartItems, newItem ];
    
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
    return { ...state, cart: { ...state.cart, cartItems } };
}

export const removeFromCart = (state, item) => {
    const cartItems = state.cart.cartItems.filter(product => product.slug !== item.slug);
    
    Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
    return { ...state, cart: { ...state.cart, cartItems } };
}