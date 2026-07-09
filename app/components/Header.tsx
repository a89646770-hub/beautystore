"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from './cartStore';
import { useAuthStore } from './authStore';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Header() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // رفع ارورهای explicit-any با استفاده از تایپ‌های دقیق
  const cart = useCartStore((state: { cart: CartItem[] }) => state.cart || []);
  const removeFromCart = useCartStore((state: { removeFromCart: (id: number) => void }) => state.removeFromCart);
  const addToCart = useCartStore((state: { addToCart: (item: Omit<CartItem, 'quantity'>) => void }) => state.addToCart);

  const { isLoggedIn, user, logout } = useAuthStore();

  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((sum: number, item: CartItem) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuantityChange = (item: CartItem, change: number) => {
    if ((item.quantity || 1) + change <= 0) {
      if (typeof removeFromCart === 'function') removeFromCart(item.id);
    } else {
      if (typeof addToCart === 'function') {
        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
      }
    }
  };

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-pink-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="text-xl font-black text-pink-600 flex items-center gap-1">
            <span className="text-2xl">🛍️</span>
            <span>بیوتی‌استور</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-5 font-bold text-gray-600">
            <Link href="/" className="hover:text-pink-500 transition-colors">صفحه اصلی</Link>
            <Link href="/shop" className="hover:text-pink-500 transition-colors">فروشگاه</Link>
            <Link href="/blog" className="hover:text-pink-500 transition-colors flex items-center gap-1">
              <span>وبلاگ</span>
              <span className="bg-pink-100 text-pink-600 text-[10px] px-1.5 py-0.5 rounded-full font-normal">جدید</span>
            </Link>
          </nav>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative w-full">
            <input 
              type="text"
              placeholder="جستجوی محصولات، برندها و..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/60 border border-gray-100 focus:border-pink-300 focus:bg-white rounded-2xl py-2 pr-10 pl-4 outline-none transition-all placeholder:text-gray-400 text-gray-700"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 bg-transparent border-0 cursor-pointer">
              🔍
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-2 bg-pink-50/50 border border-pink-100 rounded-2xl px-3 py-1.5 text-gray-700">
              <span className="font-semibold">📞 {user?.phone}</span>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => { logout(); router.push('/'); }} 
                className="text-red-500 hover:text-red-600 font-bold transition-colors bg-transparent border-0 cursor-pointer"
              >
                خروج
              </button>
            </div>
          ) : (
            <Link href="/login" className="border border-pink-200 text-pink-600 hover:bg-pink-50 font-bold px-4 py-2 rounded-2xl transition-all">
              ورود / ثبت‌نام
            </Link>
          )}

          <div className="relative">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)} 
              className="bg-pink-500 hover:bg-pink-600 text-white p-2.5 rounded-2xl flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-pink-100 rounded-3xl p-4 shadow-xl z-50">
                <h3 className="font-black text-gray-800 border-b border-gray-50 pb-2 mb-3">سبد خرید شما</h3>
                
                {cart.length === 0 ? (
                  <p className="text-center text-gray-400 py-6">سبد خرید شما در حال حاضر خالی است. 🛍️</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item: CartItem) => (
                        <div key={item.id} className="flex items-center justify-between border-b border-gray-50 pb-2 gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.image}</span>
                            <div>
                              <p className="font-bold text-gray-800 line-clamp-1 w-28">{item.name}</p>
                              <p className="text-pink-500 font-semibold">{(item.price || 0).toLocaleString()} تومان</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg p-1">
                            <button onClick={() => handleQuantityChange(item, 1)} className="w-5 h-5 flex items-center justify-center bg-white rounded font-bold text-gray-600 hover:bg-pink-50">+</button>
                            <span className="font-bold text-gray-700 min-w-4 text-center">{item.quantity || 1}</span>
                            <button onClick={() => handleQuantityChange(item, -1)} className="w-5 h-5 flex items-center justify-center bg-white rounded font-bold text-gray-600 hover:bg-pink-50">-</button>
                          </div>

                          <button onClick={() => typeof removeFromCart === 'function' && removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 bg-transparent border-0 cursor-pointer">
                            ❌
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-dashed border-gray-100">
                      <div className="flex justify-between font-bold text-gray-700 mb-3">
                        <span>مبلغ قابل پرداخت:</span>
                        <span className="text-pink-600">{totalPrice.toLocaleString()} تومان</span>
                      </div>
                      <button onClick={() => { setIsCartOpen(false); router.push('/checkout'); }} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-xl text-center cursor-pointer border-0">
                        تکمیل خرید
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}