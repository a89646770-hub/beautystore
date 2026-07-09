"use client";

import { useState } from 'react';
import Link from 'next/link';

interface BlogType {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  likes: number;
  commentsCount: number;
  timestamp: number; // برای مرتب‌سازی بر اساس تاریخ
}

export default function Blog() {
  const [sortBy, setSortBy] = useState<'newest' | 'likes' | 'comments'>('newest');

  // دیتای مقالات وبلاگ همراه با آمار لایک و کامنت
  const initialBlogs: BlogType[] = [
    {
      id: 1,
      title: "روتین پوستی شبانه برای داشتن پوست درخشان",
      excerpt: "با انجام این ۵ قدم ساده قبل از خواب، صبح‌ها با پوستی شاداب، هیدراته و بدون لک از خواب بیدار شوید. راز اصلی در تداوم و انتخاب درست محصولات است...",
      date: "۱۵ تیر ۱۴۰۵",
      image: "✨",
      likes: 124,
      commentsCount: 18,
      timestamp: 1785920000
    },
    {
      id: 2,
      title: "راهنمای انتخاب کرم پودر بر اساس نوع پوست",
      excerpt: "چگونه کرم پودری انتخاب کنیم که روی پوست اکسید و ماسیده نشود؟ ترفندهای طلایی شناخت پوست خشک، چرب و مختلط و زیرسازی اصولی آن...",
      date: "۱۰ تیر ۱۴۰۵",
      image: "💄",
      likes: 89,
      commentsCount: 24,
      timestamp: 1785488000
    },
    {
      id: 3,
      title: "تینت لب چیست و چرا باید جایگزین رژ لب شود؟",
      excerpt: "اگر به دنبال یک آرایش طبیعی، دخترانه و با ماندگاری بالا هستید که در طول روز پاک نشود، تینت لب بهترین انتخاب برای شماست...",
      date: "۰۵ تیر ۱۴۰۵",
      image: "🍓",
      likes: 156,
      commentsCount: 12,
      timestamp: 1785056000
    }
  ];

  // منطق مرتب‌سازی داینامیک مقالات
  const sortedBlogs = [...initialBlogs].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'comments') return b.commentsCount - a.commentsCount;
    return b.timestamp - a.timestamp; // پیش‌فرض: جدیدترین
  });

  return (
    <div className="min-h-screen bg-[#faf6f0] py-10 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* سربرگ وبلاگ */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-stone-200/60 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-stone-800 mb-2">مجله آموزشی بیوتی‌استور</h1>
            <p className="text-sm text-stone-500">بهترین ترفندهای آرایشی و روتین‌های مراقبت از پوست</p>
          </div>
          
          {/* دکمه‌های کامپوننت مرتب‌سازی */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-stone-200/80 shadow-xs gap-1">
            <button 
              onClick={() => setSortBy('newest')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border-0 cursor-pointer transition-all ${sortBy === 'newest' ? 'bg-pink-500 text-white' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              ⏱️ جدیدترین
            </button>
            <button 
              onClick={() => setSortBy('likes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border-0 cursor-pointer transition-all ${sortBy === 'likes' ? 'bg-pink-500 text-white' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              ❤️ بیشترین لایک
            </button>
            <button 
              onClick={() => setSortBy('comments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border-0 cursor-pointer transition-all ${sortBy === 'comments' ? 'bg-pink-500 text-white' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              💬 بیشترین کامنت
            </button>
          </div>
        </div>

        {/* لیست مقالات */}
        <div className="space-y-6">
          {sortedBlogs.map((blog) => (
            <div key={blog.id} className="bg-white border border-stone-100 rounded-[2rem] p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              
              {/* تصویر/آیکون مقاله */}
              <div className="w-20 h-20 bg-[#faf6f0] rounded-2xl flex items-center justify-center text-4xl shrink-0 self-center sm:self-auto">
                {blog.image}
              </div>

              {/* محتوای متنی */}
              <div className="flex-1">
                <div className="flex items-center gap-3 text-[11px] text-stone-400 font-bold mb-1.5">
                  <span>📅 {blog.date}</span>
                  <span>•</span>
                  <span>❤️ {blog.likes} لایک</span>
                  <span>•</span>
                  <span>💬 {blog.commentsCount} نظر</span>
                </div>
                
                <h2 className="font-black text-stone-800 text-lg mb-2 hover:text-pink-500 transition-colors">
                  <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                </h2>
                
                <p className="text-stone-500 text-xs leading-6 mb-4 line-clamp-2 text-justify">{blog.excerpt}</p>
                
                <Link 
                  href={`/blog/${blog.id}`} 
                  className="inline-flex items-center gap-1 text-xs font-black text-pink-500 hover:text-pink-600 bg-pink-50/60 hover:bg-pink-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <span>ادامه مطلب و ثبت نظر</span>
                  <span>←</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}