import { createContext, useContext, useReducer, useState } from "react";
import { cartReducer} from "./CartReducer";

const Cart = createContext();

const CartContext = ({ children }) => {
  const [products, setProducts] = useState([])

 const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: cartStorage,

  });


  return (
    <Cart.Provider value={{ state, dispatch, products, setProducts}}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export const useCartContext = () => useContext(Cart);

export default CartContext;