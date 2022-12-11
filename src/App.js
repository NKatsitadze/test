import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = function() {
    setCartIsShown(true);
  }

  const hideCartHandler = function() {
    setCartIsShown(false);
  }
  

  return <CartProvider> 
    {cartIsShown ? <Cart onClose={hideCartHandler} /> : null}
    <Header onShowCart={showCartHandler} />
    <main>
        <Meals />
    </main>
  </CartProvider>
  
}

export default App;
