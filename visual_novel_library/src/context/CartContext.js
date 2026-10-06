import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // 1. Thêm vào giỏ
  const addToCart = (book, quantity) => {
    setCartItems((prevItems) => {
      const isExisted = prevItems.find((item) => item.id === book.id);
      if (isExisted) {
        return prevItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...book, quantity: quantity }];
    });
  };

  // 2. Xóa khỏi giỏ
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 3. Cập nhật số lượng (+ hoặc -)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép giảm dưới 1
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartCount = () => {
    // return cartItems.reduce((total, item) => total + item.quantity, 0); // Trả về tổng số lượng sản phẩm trong giỏ hàng
    return cartItems.length; // Trả về số item trong giỏ hàng
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);