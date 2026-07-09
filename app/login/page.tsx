"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleAction = () => {
    // منطق ادمین (شماره 09128310114 و رمز admin)
    if (mode === 'login' && phone === "09128310114" && password === "admin") {
      router.push('/admin/dashboard');
      return;
    }

    // منطق ثبت‌نام
    if (mode === 'register') {
      if (!isOtpSent) {
        setIsOtpSent(true); // مرحله اول: ارسال کد (شبیه‌سازی)
      } else {
        router.push('/'); // مرحله دوم: تکمیل و ورود به سایت
      }
    } else {
      // منطق لاگین عادی
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] flex justify-center items-center px-4" dir="rtl">
      <main className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
          
          {/* تب‌ها */}
          <div className="flex bg-[#faf6f0] p-1 rounded-2xl mb-8">
            <button 
              onClick={() => { setMode('login'); setIsOtpSent(false); }}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all border-0 cursor-pointer ${mode === 'login' ? 'bg-white text-pink-500 shadow-xs' : 'text-stone-400'}`}
            >
              ورود
            </button>
            <button 
              onClick={() => { setMode('register'); setIsOtpSent(false); }}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all border-0 cursor-pointer ${mode === 'register' ? 'bg-white text-pink-500 shadow-xs' : 'text-stone-400'}`}
            >
              ثبت‌نام
            </button>
          </div>

          <h1 className="text-xl font-black text-gray-800 text-center mb-6">
            {mode === 'login' ? 'ورود به حساب کاربری' : (isOtpSent ? 'تایید کد یکبار مصرف' : 'ثبت‌نام در بیوتی‌استور')}
          </h1>
          
          {/* فیلد شماره موبایل - در مرحله دوم ثبت‌نام مخفی می‌شود */}
          {(!isOtpSent) && (
            <>
              <label className="block text-xs font-bold text-gray-700 mb-2">شماره تلفن همراه</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09120000000" 
                className="w-full p-4 rounded-xl border border-stone-100 mb-6 outline-none focus:border-pink-300 text-sm" 
              />
            </>
          )}

          {/* فیلد رمز - برای لاگین رمز عبور، برای ثبت‌نام مرحله دوم کد */}
          {(mode === 'login' || isOtpSent) && (
            <>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                {mode === 'login' ? 'رمز عبور' : 'کد تایید پیامک شده'}
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'login' ? 'رمز عبور خود را وارد کنید' : 'کد ۵ رقمی...'} 
                className="w-full p-4 rounded-xl border border-stone-100 mb-8 outline-none focus:border-pink-300 text-sm"
              />
            </>
          )}
          
          {/* دکمه اکشن */}
          <button 
            onClick={handleAction}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-black transition-all cursor-pointer border-0 text-sm"
          >
            {mode === 'login' ? 'ورود به حساب' : (isOtpSent ? 'ثبت‌نام نهایی و ورود' : 'دریافت کد تایید')}
          </button>
        </div>
      </main>
    </div>
  );
}