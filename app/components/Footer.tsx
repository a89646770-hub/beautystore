"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 mt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ستون اول: درباره ما */}
        <div>
          <h3 className="text-white font-black text-base mb-4 flex items-center gap-2">
            <span>🛍️</span> بیوتی‌استور
          </h3>
          <p className="text-xs leading-6 opacity-80">
            بیوتی‌استور مرجع تخصصی نقد، بررسی و فروش آنلاین برترین برندهای آرایشی و بهداشتی است. ما اصالت و کیفیت تمام محصولات را تضمین می‌کنیم.
          </p>
        </div>

        {/* ستون دوم: دسترسی سریع */}
        <div className="md:mr-12">
          <h4 className="text-white font-bold text-sm mb-4">دسترسی سریع</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/" className="hover:text-pink-400 transition-colors">صفحه اصلی</Link></li>
            <li><Link href="/shop" className="hover:text-pink-400 transition-colors">فروشگاه محصولات</Link></li>
            <li><Link href="/blog" className="hover:text-pink-400 transition-colors">آخرین مقالات وبلاگ</Link></li>
          </ul>
        </div>

        {/* ستون سوم: ارتباط با ما */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">پشتیبانی و ارتباط</h4>
          <p className="text-xs opacity-80 mb-2">📞 شماره تماس: ۰۲۱-۱۲۳۴۵۶۷۸</p>
          <p className="text-xs opacity-80 mb-4">📍 آدرس: تهران، خیابان ولیعصر، برج بیوتی</p>
          <div className="flex gap-3 text-lg">
            <span className="cursor-pointer hover:text-white">📱</span>
            <span className="cursor-pointer hover:text-white">✉️</span>
          </div>
        </div>

      </div>

      {/* بخش کپی رایت انتهای فوتر */}
      <div className="border-t border-gray-800/60 bg-gray-950/40 py-4 text-center text-[11px] opacity-60">
        © {new Date().getFullYear()} بیوتی‌استور. تمامی حقوق برای این پروژه محفوظ است.
      </div>
    </footer>
  );
}