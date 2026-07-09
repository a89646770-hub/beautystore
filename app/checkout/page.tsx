"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { useCartStore } from '../components/cartStore';
import { useAuthStore } from '../components/authStore';

export default function Checkout() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { isLoggedIn, user, addOrder } = useAuthStore();

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // لایه امنیتی: کاربر حتماً باید لاگین باشد تا بتواند سفارش ثبت کند
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-pink-50/30 text-center py-20" dir="rtl">
        <span className="text-5xl">👤</span>
        <h2 className="text-2xl font-bold text-gray-700 mt-4">برای ثبت سفارش ابتدا باید وارد حساب کاربری خود شوید!</h2>
        <button 
          onClick={() => router.push('/login')} 
          className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2.5 rounded-2xl transition-all shadow-sm"
        >
          ورود / ثبت‌نام
        </button>
      </div>
    );
  }

  // اگر سبد خرید خالی بود
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-pink-50/30 text-center py-20" dir="rtl">
        <span className="text-5xl">🛍️</span>
        <h2 className="text-2xl font-bold text-gray-700 mt-4">سبد خرید شما در حال حاضر خالی است!</h2>
        <button onClick={() => router.push('/shop')} className="text-pink-500 mt-4 inline-block underline">بازگشت به فروشگاه</button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (address.length < 10) {
      alert('لطفاً آدرس دقیق و کامل خود را وارد کنید (حداقل ۱۰ کاراکتر).');
      return;
    }
    if (postalCode.length !== 10) {
      alert('کد پستی باید دقیقاً ۱۰ رقم باشد.');
      return;
    }

    // فرستادن اطلاعات خریدار به لایه مرکزی سفارشات ادمین
    addOrder({
      phone: user?.phone || 'نامشخص',
      address: address,
      postalCode: postalCode,
      items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
      totalPrice: totalPrice
    });

    alert('سفارش شما با موفقیت ثبت شد و در صف پردازش پستی قرار گرفت! 🎉📦');
    clearCart(); // خالی کردن سبد خرید بعد از پرداخت موفق دمو
    router.push('/'); // هدایت به صفحه اصلی
  };

  return (
    <div className="min-h-screen bg-pink-50/30 text-right font-sans" dir="rtl">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-black text-gray-800 mb-8 border-r-4 border-pink-500 pr-3">فرم نهایی‌سازی و ارسال پستی سفارش</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ستون راست: فرم دریافت آدرس پستی */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-pink-100 shadow-xs">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📍 مشخصات فرستنده و آدرس</h2>
            <form onSubmit={handleSubmitOrder} className="space-y-5 text-sm">
              <div>
                <label className="block text-gray-600 font-bold mb-2">شماره تماس خریدار</label>
                <input type="text" disabled value={user?.phone} className="w-full bg-gray-100 border border-gray-200 rounded-2xl p-3 text-gray-500 cursor-not-allowed" />
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-2">آدرس دقیق پستی</label>
                <textarea 
                  required
                  rows={4} 
                  placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک، واحد"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-pink-50/20 border border-pink-100 focus:border-pink-400 rounded-2xl p-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-2">کد پستی (۱۰ رقمی)</label>
                <input 
                  type="text" 
                  required
                  maxLength={10}
                  placeholder="مثال: 1234567890"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value.replace(/\D/g, ''))} // فقط دریافت عدد
                  className="w-full tracking-widest text-center bg-pink-50/20 border border-pink-100 focus:border-pink-400 rounded-2xl p-3 outline-none font-bold"
                />
              </div>

              <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl text-base transition-colors shadow-sm">
                تایید آدرس و پرداخت نهایی دمو
              </button>
            </form>
          </div>

          {/* ستون چپ: خلاصه فاکتور خرید */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs h-fit text-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🛍️ خلاصه سبد خرید</h2>
            <div className="space-y-3 max-h-48 overflow-y-auto border-b border-gray-100 pb-4 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="line-clamp-1 w-36">{item.name} <span className="text-xs text-pink-500">({item.quantity}x)</span></span>
                  <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} تومان</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-gray-500 mb-2">
              <span>هزینه ارسال پستی:</span>
              <span className="text-green-600 font-bold">رایگان (جشنواره) 🎉</span>
            </div>
            <div className="flex justify-between items-center font-black text-gray-800 text-base pt-2 border-t border-dashed border-gray-100">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-pink-600">{totalPrice.toLocaleString()} تومان</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}