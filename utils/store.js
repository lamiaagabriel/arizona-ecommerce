import Cookies from "js-cookie";
import { createContext, useReducer, useContext } from "react";
import { addToCart, removeFromCart } from "./actions";

// Returns the updated state after the action is applied
function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return addToCart(state, action.payload);
        case 'REMOVE_FROM_CART':
            return removeFromCart(state, action.payload);
        case 'RESET_CART':
            return {
                ...state,
                cart: {
                    cartItems: [],
                    shippingAddress : { location: {} },
                    paymentMethod: ''
                }
            }
        case 'RESET_CART_ITEMS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: []
                }
            }
        case 'ADD_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress : { ...state.cart.shippingAddress, ...action.payload }
                }
            }
        
        case 'ADD_PAYMENT_METHOD':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload
                }
            }
        default:
            return state;
    }
}

const store = createContext();
const initState = {
    cart: Cookies.get('cart')? 
            JSON.parse(Cookies.get('cart')) 
            : { cartItems: [], shippingAddress: {} }
}


export const useStore = () =>  useContext(store); 
export default function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <store.Provider value={{ state, dispatch }}>
            {children}
        </store.Provider>
    )
}

/*
    -> useReducer: updates the state based on the reducer function
            state: handle with the current state
            dispatch: pass actions data to process the reducer funtions { type: 'action_title', payload: { props... } } 
*/