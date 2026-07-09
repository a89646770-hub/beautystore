"use client";

import { useState } from 'react';
import { PRODUCTS, ProductType } from '../shop/page';

export default function AdminPage() {
  const [adminProducts, setAdminProducts] = useState<ProductType[]>(PRODUCTS);

  const updateStock = (id: number, amount: number) => {
    setAdminProducts((prev: ProductType[]) =>
      prev.map((p: ProductType) =>
        p.id === id ? { ...p, views: Math.max(0, p.views + amount) } : p
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-xl font-black text-purple-950 mb-6">👑 مدیریت و بهینه‌سازی موجودی کالاها</h1>
      
      <div className="bg-white border border-purple-100 rounded-3xl p-4 space-y-4 shadow-xs">
        {adminProducts.map((product: ProductType) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{product.image}</span>
              <div>
                <p className="font-bold text-gray-800">{product.name}</p>
                <p className="text-gray-400 mt-0.5">قیمت: {product.price.toLocaleString()} تومان</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-500 ml-2">بازدید داینامیک: {product.views}</span>
              <button 
                onClick={() => updateStock(product.id, 10)} 
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold px-2.5 py-1.5 rounded-lg transition-all"
              >
                +۱۰ بازدید
              </button>
              <button 
                onClick={() => updateStock(product.id, -10)} 
                className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-2.5 py-1.5 rounded-lg transition-all"
              >
                -۱۰ بازدید
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}