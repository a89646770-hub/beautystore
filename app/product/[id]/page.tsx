"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '../../components/cartStore';

interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const addToCart = useCartStore((state: any) => state.addToCart);

  const products: ProductType[] = [
    { id: 1, name: "کرم مرطوب کننده قوی بیوتی", price: 185000, image: "🧴", category: "پوست", description: "این کرم با فرمولاسیون غنی شده از هیالورونیک اسید، پوست شما را عمیقاً آبرسانی کرده و شادابی بی‌پایانی به آن می‌بخشد.", stock: 10 },
    { id: 2, name: "ریمل حجم دهنده ضد آب", price: 310000, image: "👁️", category: "آرایشی", description: "حجم‌دهی بی‌نظیر به مژه‌ها بدون ریزش و سیاهی زیر چشم. کاملاً ضدآب و ماندگار برای تمام طول روز.", stock: 14 },
    { id: 3, name: "رژ لب مات مخملی صورتی", price: 220000, image: "💄", category: "آرایشی", description: "بافت سبک و مخملی با رنگدانه‌های فوق‌العاده قوی. بدون ایجاد خشکی و پوسته پوسته شدن روی لب‌های شما.", stock: 5 },
    { id: 4, name: "سرم ویتامین سی روشن کننده", price: 420000, image: "🧪", category: "پوست", description: "شفاف‌کننده و از بین‌برنده لک‌های پوستی. حاوی ویتامین سی خالص جهت کلاژن‌سازی و جوانسازی طبیعی.", stock: 8 },
    { id: 5, name: "تونر آبرسان گل رز", price: 195000, image: "🌹", category: "پوست", description: "تنظیم‌کننده pH پوست و پاک‌کننده نهایی منافذ با عصاره طبیعی گل رز سارایوو.", stock: 12 },
    { id: 6, name: "خط چشم ماژیکی ضدآب", price: 160000, image: "✏️", category: "آرایشی", description: "اپلیکاتور بسیار دقیق برای کشیدن بی‌نقص‌ترین خط چشم‌ها با مشکی‌ترین رنگ ممکن.", stock: 20 },
    { id: 7, name: "کرم ضد آفتاب بی‌رنگ +SPF50", price: 380000, image: "☀️", category: "پوست", description: "محافظت کامل در برابر اشعه‌های UVA و UVB بدون ایجاد سنگینی یا رد سفیدی روی پوست.", stock: 15 },
    { id: 8, name: "ماسک موی آرگان ترمیم‌کننده", price: 290000, image: "💆‍♀️", category: "مو", description: "تغذیه کارهای موهای آسیب‌دیده و رنگ شده. حاوی روغن آرگان خالص جهت نرمی و درخشندگی ایده آل.", stock: 7 },
    { id: 9, name: "ژل شستشوی صورت چای سبز", price: 175000, image: "🧼", category: "پوست", description: "کنترل‌کننده چربی ترشحی پوست و جلوگیری از ایجاد جوش با خاصیت آنتی‌اکسیدانی چای سبز.", stock: 11 },
    { id: 10, name: "پد آرایش پاک‌کن ۱۲۰ عددی", price: 65000, image: "🧻", category: "ابزار", description: "تهیه شده از پنبه ۱۰۰٪ خالص و ارگانیک بدون پرزدهی مناسب برای پاکسازی کل صورت.", stock: 40 },
    { id: 11, name: "کانسیلر مایع دور چشم", price: 240000, image: "✨", category: "آرایشی", description: "پوشش‌دهی کامل تیرگی و خطوط ریز اطراف چشم با ماندگاری بالا و بافت سبک روزانه.", stock: 6 },
    { id: 12, name: "تینت لب مرطوب‌کننده توت‌فرنگی", price: 135000, image: "🍓", category: "آرایشی", description: "ایجاد رنگ طبیعی و ماندگار روی لب‌ها و گونه‌ها همراه با رایحه دیوانه‌کننده توت‌فرنگی طبیعی.", stock: 9 },
    { id: 13, name: "روغن تقویت مژه و ابرو طبیعی", price: 210000, image: "🌱", category: "مو", description: "فرموله شده با روغن‌های کرچک، فندق و بادام تلخ جهت پرپشت کردن مژه‌ها در ۴ هفته.", stock: 4 },
  ];

  const productId = Number(params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex flex-col items-center justify-center" dir="rtl">
        <p className="text-lg text-stone-500 font-bold mb-4">محصول مورد نظر یافت نشد! 🕵️‍♂️</p>
        <Link href="/shop" className="bg-pink-500 text-white px-6 py-2 rounded-xl font-bold">بازگشت به فروشگاه</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6f0] py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white border border-stone-100 rounded-[2.5rem] p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        
        {/* بخش تصویر محصول */}
        <div className="w-full md:w-1/2 bg-[#faf6f0] rounded-3xl h-80 flex items-center justify-center text-8xl shadow-xs">
          {product.image}
        </div>

        {/* بخش اطلاعات فنی و دکمه خرید */}
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
          <div>
            <span className="bg-pink-50 text-pink-600 text-xs font-black px-3 py-1 rounded-full">{product.category}</span>
            <h1 className="text-2xl font-black text-stone-800 mt-3 mb-2">{product.name}</h1>
            <p className="text-xs text-stone-400 font-bold mb-4">وضعیت انبار: موجود ({product.stock} عدد)</p>
            <p className="text-sm text-stone-500 leading-7 mb-6 text-justify">{product.description}</p>
          </div>

          <div className="border-t border-stone-100 pt-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-400 block font-bold mb-1">قیمت نهایی:</span>
              <span className="text-xl font-black text-stone-800">{product.price.toLocaleString()} تومان</span>
            </div>
            
            <button 
              onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
              className="bg-pink-500 hover:bg-pink-600 text-white font-black px-6 py-3.5 rounded-2xl shadow-xs transition-colors cursor-pointer border-0 text-sm"
            >
              افزودن به سبد خرید 🛍️
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}