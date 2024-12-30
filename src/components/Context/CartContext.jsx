import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addProduct = (item, quantity) => {
    if (isInCart(item.id)) {
      setCarrito(
        carrito.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + quantity }
            : product
        )
      );
    } else {
      setCarrito([...carrito, { ...item, quantity }]);
    }
  };

  const totalPrice = () =>
    carrito.reduce((prev, act) => prev + act.quantity * act.price, 0);

  const totalProducts = () =>
    carrito.reduce((acum, product) => acum + product.quantity, 0);

  const cleanCart = () => setCarrito([]);

  const isInCart = (id) => carrito.some((product) => product.id === id);

  const removeProduct = (id) => setCarrito(carrito.filter((product) => product.id !== id));

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        addProduct,
        removeProduct,
        cleanCart,
        totalPrice,
        totalProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
