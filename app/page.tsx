"use client";

import Link from 'next/link';
import { useCartStore } from './components/cartStore';

// تعریف اینترفیس‌ها
interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: number;
  salesPerMonth?: number;
}

interface BlogType {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

// کامپوننت اصلی که حتماً باید export default باشد
export default function Home() {
  const addToCart = useCartStore((state: any) => state.addToCart);

  const products: ProductType[] = [
    { id: 1, name: "کرم مرطوب کننده قوی بیوتی", price: 185000, image: "🧴", stock: 10, salesPerMonth: 120 },
    { id: 2, name: "سرم ویتامین سی روشن کننده", price: 420000, image: "🧪", stock: 8, salesPerMonth: 520 },
    { id: 3, name: "ریمل حجم دهنده ضد آب", price: 310000, image: "👁️", stock: 14, salesPerMonth: 310 },
    { id: 4, name: "رژ لب مات مخملی صورتی", price: 220000, image: "💄", stock: 5, salesPerMonth: 450 },
  ];

  const latestBlogs: BlogType[] = [
    { id: 1, title: "روتین پوستی شبانه برای داشتن پوست درخشان", excerpt: "با انجام این ۵ قدم ساده قبل از خواب...", date: "۱۵ تیر ۱۴۰۵", image: "✨" },
    { id: 2, title: "راهنمای انتخاب کرم پودر", excerpt: "چگونه کرم پودری انتخاب کنیم که ماسیده نشود...", date: "۱۰ تیر ۱۴۰۵", image: "💄" }
  ];

  const popularProducts = [...products].sort((a, b) => (b.salesPerMonth || 0) - (a.salesPerMonth || 0));

  return (
    <div className="min-h-screen bg-[#faf6f0] py-6 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* لینک سریع */}
        <div className="flex justify-end mb-4">
          <Link href="/shop" className="text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 bg-white px-4 py-2 rounded-xl shadow-xs">
            <span>ورود به فروشگاه محصولات</span>
            <span>←</span>
          </Link>
        </div>

        {/* بنر */}
        <div className="w-full bg-gradient-to-r from-pink-400 via-pink-300 to-rose-300 rounded-[2.5rem] py-14 px-8 text-center text-gray-850 mb-16 shadow-xs">
          <h2 className="text-3xl md:text-4xl font-black text-pink-950 mb-3">زیبایی را به خودت هدیه بده 🌸</h2>
          <Link href="/shop" className="inline-block bg-white text-pink-600 font-bold px-8 py-3.5 rounded-2xl shadow-xs">ورود به فروشگاه اصلی 🛍️</Link>
        </div>

        {/* محصولات */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-800 flex items-center gap-2"><span>🔥</span> محبوب‌ترین و پرفروش‌ترین‌ها</h3>
          <Link href="/shop" className="text-xs font-bold text-pink-500 hover:underline">مشاهده همه محصولات ←</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {popularProducts.map((product) => (
            <div key={product.id} className="bg-white border border-stone-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] text-gray-400 font-bold">👁️ {product.salesPerMonth} بازدید</span>
              <div className="h-40 w-full bg-[#faf6f0] rounded-2xl flex items-center justify-center text-5xl my-4">{product.image}</div>
              <h4 className="font-black text-gray-800 text-sm mb-1">{product.name}</h4>
              <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
                <button onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })} className="bg-pink-500 text-white font-bold text-xs px-3 py-2 rounded-xl cursor-pointer">
                  + خرید
                </button>
                <span className="font-black text-gray-800 text-sm">{product.price.toLocaleString()} تومان</span>
              </div>
            </div>
          ))}
        </div>

        {/* وبلاگ */}
        <div className="border-t border-stone-200/50 pt-12 mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-800 flex items-center gap-2"><span>📝</span> جدیدترین مقاله‌های آموزشی</h3>
            <Link href="/blog" className="text-xs font-bold text-pink-500 hover:underline">مشاهده همه مقالات ←</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestBlogs.map((blog) => (
              <div key={blog.id} className="bg-white border border-stone-100 rounded-3xl p-6 shadow-xs flex gap-4 items-start">
                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-3xl">{blog.image}</div>
                <div className="flex-1">
                  <h4 className="font-black text-gray-800 text-base mb-2"><Link href={`/blog/${blog.id}`}>{blog.title}</Link></h4>
                  <p className="text-xs text-gray-500 leading-6">{blog.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}