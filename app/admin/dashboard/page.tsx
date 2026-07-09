"use client";
import { useStore } from '../../../data/store';

export default function AdminDashboard() {
  const { products, updateStock } = useStore();

  return (
    <div className="p-8 bg-[#faf6f0] min-h-screen" dir="rtl">
      <h1 className="text-2xl font-black mb-8">پیشخوان مدیریت</h1>
      
      {/* مدیریت محصولات */}
      <div className="bg-white p-6 rounded-3xl mb-8">
        <h2 className="font-black mb-4">ویرایش موجودی محصولات</h2>
        {products.map((p: any) => (
          <div key={p.id} className="flex gap-4 mb-4 items-center">
            <span>{p.name}</span>
            <input 
              type="number" 
              defaultValue={p.stock} 
              className="border p-2 rounded-lg w-20"
              onChange={(e) => updateStock(p.id, Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      {/* بخش‌های دیگر (مقالات و پست) به همین صورت با استفاده از متدهای store ساخته می‌شوند */}
    </div>
  );
}