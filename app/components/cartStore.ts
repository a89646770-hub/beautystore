import { create } from 'zustand';

// تعریف ساختار هر آیتم در سبد خرید
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// تعریف متدها و حالت‌های استور
interface CartState {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void; // اضافه شدن این خط برای حل ارور
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

  // پیاده‌سازی تابع تغییر تعداد برای افزایش و کاهش دکمه‌های هدر
  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === id ? { ...item, quantity: quantity } : item
    ),
  })),

  clearCart: () => set({ cart: [] }),
}));