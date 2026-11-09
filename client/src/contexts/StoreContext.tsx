import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product, formatPrice } from "@/lib/catalog";

type CartLine = { product: Product; quantity: number };
type StoreContextValue = {
  cart: CartLine[];
  currency: string;
  language: string;
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  cartCount: number;
  subtotal: number;
  cartSubtotal: string;
  setCurrency: (value: string) => void;
  setLanguage: (value: string) => void;
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  setCartOpen: (value: boolean) => void;
  setSearchOpen: (value: boolean) => void;
  clearCart: () => void;
};
const StoreContext = createContext<StoreContextValue | null>(null);
const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => read("aether-cart", []));
  const [currency, setCurrency] = useState(() =>
    read("aether-currency", "USD")
  );
  const [language, setLanguage] = useState(() => read("aether-language", "EN"));
  const [wishlist, setWishlist] = useState<string[]>(() =>
    read("aether-wishlist", [])
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(
    () => localStorage.setItem("aether-cart", JSON.stringify(cart)),
    [cart]
  );
  useEffect(
    () => localStorage.setItem("aether-currency", JSON.stringify(currency)),
    [currency]
  );
  useEffect(
    () => localStorage.setItem("aether-language", JSON.stringify(language)),
    [language]
  );
  useEffect(
    () => localStorage.setItem("aether-wishlist", JSON.stringify(wishlist)),
    [wishlist]
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const addToCart = (product: Product) => {
    setCart(lines => {
      const found = lines.find(line => line.product.id === product.id);
      return found
        ? lines.map(line =>
            line.product.id === product.id
              ? { ...line, quantity: line.quantity + 1 }
              : line
          )
        : [...lines, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const updateQuantity = (id: string, delta: number) =>
    setCart(lines =>
      lines
        .map(line =>
          line.product.id === id
            ? { ...line, quantity: Math.max(0, line.quantity + delta) }
            : line
        )
        .filter(line => line.quantity > 0)
    );
  const removeFromCart = (id: string) =>
    setCart(lines => lines.filter(line => line.product.id !== id));
  const toggleWishlist = (id: string) =>
    setWishlist(items =>
      items.includes(id) ? items.filter(item => item !== id) : [...items, id]
    );
  const value = useMemo(
    () => ({
      cart,
      currency,
      language,
      wishlist,
      cartOpen,
      searchOpen,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: cart.reduce(
        (sum, line) => sum + line.product.price * line.quantity,
        0
      ),
      cartSubtotal: formatPrice(
        cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
        currency
      ),
      setCurrency,
      setLanguage,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      setCartOpen,
      setSearchOpen,
      clearCart: () => setCart([]),
    }),
    [cart, currency, language, wishlist, cartOpen, searchOpen]
  );
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used within StoreProvider");
  return value;
}
