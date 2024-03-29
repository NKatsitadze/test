import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const reducer = function(state, action) {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
        if (action.type === 'REMOVE') {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
            const existingItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingItem.price;
            let updatedItems;
            if(existingItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id);
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1};
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        }

        if(action.type === 'CLEAR'){
            return defaultCartState;
        }
        return defaultCartState;
}

const CartProvider = function(props) {
    const [cartState, dispatch] = useReducer(reducer, defaultCartState)

    const addItemToCartHandler = function(item) {
        dispatch({type: 'ADD', item: item})
    }

    const removeItemFromCartHandler = function(id) {
        dispatch({type: 'REMOVE', id: id})
    }

    const clearCartHandler = function() {
        dispatch({type: 'CLEAR'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    }


    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider