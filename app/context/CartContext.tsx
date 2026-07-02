"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  ReactNode,
} from "react";
import type { MenuItem } from "@/app/data/menu";

export type CartLine = { item: MenuItem; qty: number };
type CartState = { lines: Record<string, CartLine> };

type Action =
  | { type: "add"; item: MenuItem }
  | { type: "decrement"; id: string }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "hydrate"; state: CartState };

const STORAGE_KEY = "bella-cucina-cart";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.lines[action.item.id];
      return {
        lines: {
          ...state.lines,
          [action.item.id]: {
            item: action.item,
            qty: (existing?.qty ?? 0) + 1,
          },
        },
      };
    }
    case "decrement": {
      const existing = state.lines[action.id];
      if (!existing) return state;
      if (existing.qty <= 1) {
        const { [action.id]: _, ...rest } = state.lines;
        return { lines: rest };
      }
      return {
        lines: {
          ...state.lines,
          [action.id]: { ...existing, qty: existing.qty - 1 },
        },
      };
    }
    case "remove": {
      const { [action.id]: _, ...rest } = state.lines;
      return { lines: rest };
    }
    case "clear":
      return { lines: {} };
    case "hydrate":
      return action.state;
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: MenuItem) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: {} });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", state: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const lines = Object.values(state.lines);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.item.price, 0),
      add: (item) => dispatch({ type: "add", item }),
      decrement: (id) => dispatch({ type: "decrement", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
      qtyOf: (id) => state.lines[id]?.qty ?? 0,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
