import {
  CartIconProps,
  CartContextType,
  CartItem,
  CartProviderProps,
  Product,
} from "@/types";

import React, { createContext, useContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

// three steps,
//
//create Cart context

const CartContext = createContext<CartContextType | undefined>(undefined);

// create the provider component

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  //load cart items form asyncStorage on mount

  useEffect(() => {
    const loadCart = async () => {
      try {
        const saveCart = await AsyncStorage.getItem("cart");
        if (saveCart) {
          setItems(JSON.parse(saveCart));
        }
      } catch (error) {
        console.error("Error loading cart from storage", error);
      }
    };
    loadCart();
  }, []);

  // save cart items to asyncStorage whenever they change

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(items));
      } catch (error) {
        console.error("Error saving cart to storage", error);
      }
    };
    saveCart();
  }, [items]);

  // add product to cart

  const addItem = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // update quantity if item already exists
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // add new item if it doesn't exist

        return [...prevItems, { product, quantity }];
      }
    });
  };

  // remove product from cart

  const removeItem = (productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // function to update the quantity of a sepcific item in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  //function to clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // function to get the total number of items in the cart
  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // function to get the total price of items in the cart

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// customer hook to use the cart context

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("userCart must be used within a CartProvider");
  }
  return context;
}
