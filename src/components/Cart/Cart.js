import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = function(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = function(id) {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = function(item) {
        cartCtx.addItem({ ...item, amount: 1})
    }

    const orderHandler = function() {
        setIsCheckout(true);
    }

    const submitOrderHandler = async function(userData) {
        try {
            setIsSubmitting(true);
            const response = await fetch('https://meals-project-b6b54-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItem: cartCtx.items
                })
            })
            if(!response.ok) {
                throw new Error('Something went wrong with database, please try again')
            }

        } catch (err) {
            console.log(`${err.message}, Please try again`)
        }

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }


    const cartItems = ( <ul className={classes['cart-items']} >
    {cartCtx.items.map((each) => (
    <CartItem 
    key={each.id} 
    name={each.name} 
    amount={each.amount} 
    price={each.price} 
    onRemove={cartItemRemoveHandler.bind(null, each.id)} 
    onAdd={cartItemAddHandler.bind(null, each)} />))} </ul> );

    const modalActions = <div className={classes.actions}>
    <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
    {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
</div>

        const cartModalContent = <React.Fragment> 
         {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout ? <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} /> : null}
        {!isCheckout ? modalActions : null}
        </React.Fragment>

        const isSubmittingModalContent = <p>Sending order data...</p>
        const didSubmitModalContent = <React.Fragment> 
        <p>Order sent successfully!</p> 
        <div className={classes.actions}>
    <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
    </div> </React.Fragment>

    return <Modal onClose={props.onClose}> 
        {!isSubmitting && !didSubmit ? cartModalContent : null}
        {isSubmitting ? isSubmittingModalContent : null}
        {!isSubmitting && didSubmit ? didSubmitModalContent : null}
    </Modal>
}

export default Cart;