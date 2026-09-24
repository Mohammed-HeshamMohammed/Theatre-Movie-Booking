import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_KEY = "cinema_cart";
const SEAT_PRICE = 10;

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY));
    return {
      items: Array.isArray(raw?.items) ? raw.items : [],
      seatsByMovie: raw?.seatsByMovie && typeof raw.seatsByMovie === "object" ? raw.seatsByMovie : {},
    };
  } catch {
    return { items: [], seatsByMovie: {} };
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart().items);
  const [seatsByMovie, setSeatsByMovie] = useState(() => loadCart().seatsByMovie);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify({ items, seatsByMovie }));
  }, [items, seatsByMovie]);

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.category === item.category);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.category === item.category ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id, category) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.category === category)));
  };

  const toggleSeat = (movieId, seatId) => {
    setSeatsByMovie((prev) => {
      const current = prev[movieId] || [];
      const next = current.includes(seatId)
        ? current.filter((id) => id !== seatId)
        : [...current, seatId];
      return { ...prev, [movieId]: next };
    });
  };

  const clearCart = () => {
    setItems([]);
    setSeatsByMovie({});
  };

  const totalSeats = useMemo(
    () => Object.values(seatsByMovie).reduce((sum, seats) => sum + seats.length, 0),
    [seatsByMovie]
  );
  const seatsTotal = totalSeats * SEAT_PRICE;
  const itemsTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );
  const grandTotal = itemsTotal + seatsTotal;

  const value = {
    items,
    seatsByMovie,
    addItem,
    removeItem,
    toggleSeat,
    clearCart,
    totalSeats,
    seatsTotal,
    itemsTotal,
    grandTotal,
    seatPrice: SEAT_PRICE,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
