import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { effectivePrice, type Product } from "@/data/catalog";
import { listProducts } from "@/lib/storefront.functions";

export const productsQueryOptions = {
  queryKey: ["products"],
  queryFn: () => listProducts(),
  staleTime: 60_000,
};

export interface CartLine {
  id: string;
  quantity: number;
}

interface ShopState {
  products: Product[];
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (id: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  cartItems: { product: Product; quantity: number }[];
  wishlistItems: Product[];
  cartCount: number;
  subtotal: number;
}

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "monrea.cart";
const WISH_KEY = "monrea.wishlist";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { data: products = [] } = useQuery(productsQueryOptions);

  useEffect(() => {
    setCart(read<CartLine[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((id: string, quantity = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) {
        return prev.map((l) => (l.id === id ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [...prev, { id, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, quantity } : l)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  }, []);

  const value = useMemo<ShopState>(() => {
    const cartItems = cart
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        return product ? { product, quantity: line.quantity } : null;
      })
      .filter(Boolean) as { product: Product; quantity: number }[];

    return {
      products,
      cart,
      wishlist,
      cartOpen,
      setCartOpen,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      toggleWishlist,
      inWishlist: (id: string) => wishlist.includes(id),
      cartItems,
      wishlistItems: wishlist
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as Product[],
      cartCount: cartItems.reduce((n, i) => n + i.quantity, 0),
      subtotal: cartItems.reduce((n, i) => n + effectivePrice(i.product) * i.quantity, 0),
    };
  }, [
    products,
    cart,
    wishlist,
    cartOpen,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    toggleWishlist,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
