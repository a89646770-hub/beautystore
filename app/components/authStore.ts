import { create } from 'zustand';

// تعریف ساختار کاربر
interface User {
  phone: string;
  role: 'user' | 'admin';
}

// تعریف ساختار حساب‌های ثبت‌نام شده
interface RegisteredAccount {
  phone: string;
  passwordHash: string;
  role: 'user' | 'admin';
}

// تعریف ساختار سفارش پستی
export interface Order {
  id: string;
  phone: string;
  address: string;
  postalCode: string;
  items: { name: string; quantity: number; price: number }[];
  totalPrice: number;
  date: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  accounts: RegisteredAccount[];
  orders: Order[];
  register: (phone: string, passwordHash: string) => void;
  login: (phone: string, passwordHash: string) => boolean;
  logout: () => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoggedIn: false,
  
  // اکانت‌های پیش‌فرض سایت (شماره ادمین به صورت پیش‌فرض ساخته شده است)
  accounts: [
    { phone: '09120000000', passwordHash: 'admin123', role: 'admin' }
  ],
  
  // لیست سفارشات پستی پیش‌فرض دمو برای دیدن ادمین
  orders: [
    { id: 'ORD-1024', phone: '09155556677', address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۴', postalCode: '1234567890', items: [{ name: 'کرم مرطوب‌کننده لاکچری هیدرا', quantity: 2, price: 408000 }], totalPrice: 816000, date: '۱۴۰۵/۰۴/۱۷' }
  ],

  register: (phone, passwordHash) => {
    set((state) => ({
      accounts: [...state.accounts, { phone, passwordHash, role: 'user' }]
    }));
  },

  login: (phone, passwordHash) => {
    const account = get().accounts.find(acc => acc.phone === phone && acc.passwordHash === passwordHash);
    if (account) {
      set({ user: { phone: account.phone, role: account.role }, isLoggedIn: true });
      return true;
    }
    return false;
  },

  logout: () => set({ user: null, isLoggedIn: false }),

  addOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('fa-IR')
    };
    set((state) => ({ orders: [newOrder, ...state.orders] }));
  }
}));