import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = function(value) {
   return value.trim() === '';
}

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid,
    })
    
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostalCode,
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid
    if(!formIsValid) {
        return;
    }
};



  const errorStyle = {
    color: 'red',
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
      </div>
        {!formInputsValidity.name ? <span style={errorStyle}>Please Enter Valid Name</span> : null}
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
      </div>
        {!formInputsValidity.street ? <span style={errorStyle}>Please Enter Valid Street</span> : null}
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalCodeInputRef} type='text' id='postal' />
      </div>
        {!formInputsValidity.postalCode ? <span style={errorStyle}>Please Enter Valid Postal</span> : null}
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
      </div>
        {!formInputsValidity.city ? <span style={errorStyle}>Please Enter Valid City</span> : null}
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;