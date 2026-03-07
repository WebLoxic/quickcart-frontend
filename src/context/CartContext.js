"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {

    setCart((prev) => {

      const existing = prev.find((item) => item.id === product.id);

      if (existing) {

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );

      }

      return [...prev, { ...product, qty: 1 }];

    });

  };

  const removeFromCart = (id) => {

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );

  };

  /* ✅ ADD THIS FUNCTION */

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((t, item) => t + item.qty, 0);

  const cartTotal = cart.reduce(
    (t, item) => t + item.qty * item.price,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,   // ✅ expose here
        cartCount,
        cartTotal
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {

  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;

}