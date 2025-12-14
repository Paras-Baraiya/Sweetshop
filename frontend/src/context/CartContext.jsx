import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (sweet) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === sweet._id);

      if (existing) {
        // ✅ ADD selected quantity (not overwrite)
        return prev.map(i =>
          i._id === sweet._id
            ? { ...i, qty: i.qty + sweet.qty }
            : i
        );
      }

      // ✅ First time add with selected qty
      return [...prev, { ...sweet, qty: sweet.qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
