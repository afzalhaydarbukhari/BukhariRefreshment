import React, { createContext, useState, ReactNode } from 'react';
import { MenuItem } from '../services/menuService';
import { CartItem } from '../services/cartService';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: MenuItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((ci) => ci.item.id === item.id);
      
      if (existingItem) {
        return currentItems.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      
      return [...currentItems, { item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((currentItems) => currentItems.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems((currentItems) =>
      currentItems.map((ci) =>
        ci.item.id === itemId ? { ...ci, quantity } : ci
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (itemId: string): number => {
    const cartItem = items.find((ci) => ci.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
