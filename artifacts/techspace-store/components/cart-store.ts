import { useCallback, useEffect, useState } from 'react';

export type CartEntry = { productId: string; quantity: number };
const STORAGE_KEY = 'techspace-cart-v1';

function readCart(): CartEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartEntry => typeof item?.productId === 'string' && Number.isInteger(item?.quantity) && item.quantity > 0 && item.quantity <= 20);
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((productId: string) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) return current.map((item) => item.productId === productId ? { ...item, quantity: Math.min(20, item.quantity + 1) } : item);
      return [...current, { productId, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) => quantity <= 0 ? current.filter((item) => item.productId !== productId) : current.map((item) => item.productId === productId ? { ...item, quantity: Math.min(20, quantity) } : item));
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return { items, ready, add, setQuantity, remove, clear };
}
