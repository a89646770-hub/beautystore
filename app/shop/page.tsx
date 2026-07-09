"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../components/cartStore';

interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  views: number;
  stock: number;
}

export default function Shop() {
  const addToCart = useCartStore((state: any) => state.addToCart);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // ۱۳ محصول جذاب فروشگاه بیوتی‌استور
  const products: ProductType[] = [
    { id: 1, name: "کرم مرطوب کننده قوی بیوتی", price: 185000, image: "🧴", category: "پوست", views: 120, stock: 10 },
    { id: 2, name: "ریمل حجم دهنده ضد آب", price: 310000, image: "👁️", category: "آرایشی", views: 310, stock: 14 },
    { id: 3, name: "رژ لب مات مخملی صورتی", price: 220000, image: "💄", category: "آرایشی", views: 450, stock: 5 },
    { id: 4, name: "سرم ویتامین سی روشن کننده", price: 420000, image: "🧪", category: "پوست", views: 520, stock: 8 },
    { id: 5, name: "تونر آبرسان گل رز", price: 195000, image: "🌹", category: "پوست", views: 95, stock: 12 },
    { id: 6, name: "خط چشم ماژیکی ضدآب", price: 160000, image: "✏️", category: "آرایشی", views: 210, stock: 20 },
    { id: 7, name: "کرم ضد آفتاب بی‌رنگ +SPF50", price: 380000, image: "☀️", category: "پوست", views: 640, stock: 15 },
    { id: 8, name: "ماسک موی آرگان ترمیم‌کننده", price: 290000, image: "💆‍♀️", category: "مو", views: 180, stock: 7 },
    { id: 9, name: "ژل شستشوی صورت چای سبز", price: 175000, image: "🧼", category: "پوست", views: 340, stock: 11 },
    { id: 10, name: "پد آرایش پاک‌کن ۱۲۰ عددی", price: 65000, image: "🧻", category: "ابزار", views: 500, stock: 40 },
    { id: 11, name: "کانسیلر مایع دور چشم", price: 240000, image: "✨", category: "آرایشی", views: 280, stock: 6 },
    { id: 12, name: "تینت لب مرطوب‌کننده توت‌فرنگی", price: 135000, image: "🍓", category: "آرایشی", views: 410, stock: 9 },
    { id: 13, name: "روغن تقویت مژه و ابرو طبیعی", price: 210000, image: "🌱", category: "مو", views: 155, stock: 4 },
  ];

  // محاسبه منطق صفحه‌بندی
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#faf6f0] py-10 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 text-center sm:text-right">
          <h1 className="text-3xl font-black text-gray-800 mb-2">فروشگاه بیوتی‌استور</h1>
          <p className="text-sm text-gray-500">مجموعه ۱۳ محصول از برترین مراقبت‌کننده‌ها و اقلام آرایشی اصیل</p>
        </div>

        {/* گرید محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white border border-stone-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between group transition-all hover:shadow-md">
              <div className="flex justify-between items-center text-[11px] text-stone-400 font-bold">
                <span>👁️ {product.views} بازدید</span>
                <span className="bg-pink-50 text-pink-500 px-2.5 py-0.5 rounded-full">{product.category}</span>
              </div>

              <Link href={`/product/${product.id}`} className="h-40 w-full bg-[#faf6f0]/50 rounded-2xl flex items-center justify-center text-5xl my-4 group-hover:scale-105 transition-transform cursor-pointer">
                {product.image}
              </Link>

              <div className="text-center mt-2">
                <h4 className="font-black text-stone-800 text-sm mb-1 hover:text-pink-500 transition-colors">
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h4>
                <p className="text-[11px] text-stone-400 mb-4">موجود در انبار: {product.stock} عدد</p>
              </div>

              <div className="flex items-center justify-between border-t border-stone-50 pt-3 mt-2">
                <button 
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer border-0"
                >
                  + خرید
                </button>
                <span className="font-black text-stone-800 text-sm">
                  {product.price.toLocaleString()} تومان
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* کامپوننت صفحه‌بندی دکمه‌ای */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all border-0 cursor-pointer ${
                  currentPage === page 
                    ? 'bg-pink-500 text-white shadow-xs' 
                    : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}