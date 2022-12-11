import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = function(props) {
    const [bump, setBump] = useState(false);
   const cartCtx = useContext(CartContext);
   const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
   }, 0)

   const btnClasses = `${classes.button} ${bump ? classes.bump : ''}`;

   const {items} = cartCtx;

   useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBump(true);
        const timer = setTimeout(() => {
            setBump(false)
        }, 300);

        return() => {
            clearTimeout(timer);
        }

   }, [items])

    return <button onClick={props.onClick} className={btnClasses}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;