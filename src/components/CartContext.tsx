"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  deliveryNotes: string;
  setDeliveryNotes: (notes: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryNotes, setDeliveryNotesState] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage after mount to prevent hydration issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      const savedCart = localStorage.getItem("momspure_cart");
      const savedNotes = localStorage.getItem("momspure_notes");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart items", e);
        }
      }
      if (savedNotes) {
        setDeliveryNotesState(savedNotes);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("momspure_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDeliveryNotesState("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("momspure_cart");
      localStorage.removeItem("momspure_notes");
    }
  };

  const setDeliveryNotes = (notes: string) => {
    setDeliveryNotesState(notes);
    if (typeof window !== "undefined") {
      localStorage.setItem("momspure_notes", notes);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: isMounted ? cartItems : [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: isMounted ? cartCount : 0,
        cartTotal: isMounted ? cartTotal : 0,
        deliveryNotes,
        setDeliveryNotes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
