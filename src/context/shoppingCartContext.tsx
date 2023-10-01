import { ReactNode, createContext, useContext, useState } from "react";

import { items } from "../data/items";

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface ShoppingCartContext {
  getItemQuantity: (id: number, size: string) => number;
  getEntireCart: () => CartItem[];
  increaseCartQuantity: (id: number, size: string) => void;
  decreaseCartQuantity: (id: number, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  getTotal: () => number;
}

export interface CartItem {
  id: number;
  quantity: number;
  size: string;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number, size: string) {
    return (
      cartItems.find((item) => item.id === id && item.size === size)
        ?.quantity || 0
    );
  }

  function increaseCartQuantity(id: number, size: string) {
    // @ts-ignore
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.id === id && item.size === size) == null
      ) {
        return [...currItems, { id, quantity: 1, size }];
      } else {
        return currItems.map((item) => {
          if (item.id === id && item.size === size) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number, size: string) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.id === id && item.size === size)
          ?.quantity === 1
      ) {
        return currItems.filter((item) => item.id !== id || item.size !== size);
      } else {
        return currItems.map((item) => {
          if (item.id === id && item.size === size) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number, size: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id || item.size !== size);
    });
  }

  function getEntireCart() {
    return cartItems;
  }

  function getTotal() {
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
      total +=
        cartItems[i].quantity *
        items[cartItems[i].id.toString() as keyof typeof items].price;
    }

    return total;
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getEntireCart,
        getTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
