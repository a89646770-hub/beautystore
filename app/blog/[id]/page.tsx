"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BlogType {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  likes: number;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export default function BlogDetail() {
  const params = useParams();
  const blogId = Number(params.id);

  // دیتای مقالات کامل
  const blogs: BlogType[] = [
    {
      id: 1,
      title: "روتین پوستی شبانه برای داشتن پوست درخشان",
      content: "پوست ما در طول شب فرآیند بازسازی سلولی را آغاز می‌کند. یک روتین شبانه اصولی شامل پاکسازی دوفاز (میسلار و ژل شستشو)، استفاده از تونر آبرسان، سرم‌های مغذی مانند ویتامین سی یا رتنول، و در نهایت کرم مرطوب‌کننده شب است. تداوم این کار در کمتر از دو هفته شفافیت و درخشندگی خیره‌کننده‌ای به پوست شما خواهد بخشید.",
      date: "۱۵ تیر ۱۴۰۵",
      image: "✨",
      likes: 124
    },
    {
      id: 2,
      title: "راهنمای انتخاب کرم پودر بر اساس نوع پوست",
      content: "اگر پوست چربی دارید باید از کرم پودرهای مات و بدون چربی (Oil-Free) استفاده کنید تا جوش نزنید. برای پوست‌های خشک، کرم پودرهای حاوی روغن آرگان یا هیالورونیک اسید که جلوه ای براق و شاداب دارند مناسب است. قبل از زدن کرم پودر، حتما از پرایمر مخصوص استفاده کنید تا منافذ پوست کاملاً یکدست شوند.",
      date: "۱۰ تیر ۱۴۰۵",
      image: "💄",
      likes: 89
    },
    {
      id: 3,
      title: "تینت لب چیست و چرا باید جایگزین رژ لب شود؟",
      content: "تینت‌های لب بر پایه آب ساخته شده‌اند و فاقد موم و سرب سنگین رژ لب‌ها هستند. این محصولات جذب پوست لب شده و جلوه‌ای فوق‌العاده طبیعی شبیه به رنگ خود لب ایجاد می‌کنند. همچنین در طول روز با نوشیدن مایعات یا خوردن غذا به هیچ وجه پخش یا پاک نخواهند شد.",
      date: "۰۵ تیر ۱۴۰۵",
      image: "🍓",
      likes: 156
    }
  ];

  const blog = blogs.find(b => b.id === blogId);

  // استیت‌های لایک و کامنت زنده برای تعامل کاربر
  const [likesCount, setLikesCount] = useState(blog ? blog.likes : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "سارا رضایی", text: "واقعا عالی بود، من از وقتی روتین شبانه رو شروع کردم جوش‌هام خیلی کمتر شده.", date: "۱۶ تیر ۱۴۰۵" }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex flex-col items-center justify-center" dir="rtl">
        <p className="text-lg text-stone-500 font-bold mb-4">مقاله مورد نظر یافت نشد! 📝</p>
        <Link href="/blog" className="bg-pink-500 text-white px-6 py-2 rounded-xl font-bold">بازگشت به وبلاگ</Link>
      </div>
    );
  }

  // اکشن لایک کردن
  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // اکشن ارسال کامنت کاملا پویا
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const addedComment: Comment = {
      id: Date.now(),
      author: newCommentName,
      text: newCommentText,
      date: "امروز"
    };

    setComments([addedComment, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] py-12 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        
        {/* دکمه بازگشت */}
        <Link href="/blog" className="inline-block text-xs font-bold text-stone-500 mb-4 hover:text-pink-500">
          ← بازگشت به لیست مقالات
        </Link>

        {/* کارت اصلی مقاله */}
        <div className="bg-white border border-stone-100 rounded-[2.5rem] p-6 md:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#faf6f0] rounded-2xl flex items-center justify-center text-4xl shrink-0">
              {blog.image}
            </div>
            <div>
              <span className="text-[11px] text-stone-400 font-bold block mb-1">📅 منتشر شده در {blog.date}</span>
              <h1 className="text-2xl font-black text-stone-800">{blog.title}</h1>
            </div>
          </div>

          <p className="text-stone-600 text-sm leading-8 text-justify border-b border-stone-50 pb-6 mb-6">
            {blog.content}
          </p>

          {/* بخش لایک تعاملی */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-bold">از این مقاله آموزشی راضی بودید؟</span>
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 border-0 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${isLiked ? 'bg-red-50 text-red-500 shadow-xs scale-105' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}
            >
              <span>{isLiked ? '❤️ لایک شده' : '🤍 پسندیدن'}</span>
              <span className="bg-white/80 text-stone-800 px-1.5 py-0.5 rounded-md">{likesCount}</span>
            </button>
          </div>
        </div>

        {/* 💬 بخش کامنت‌ها و نظرات زنده کاربران */}
        <div className="bg-white border border-stone-100 rounded-[2.5rem] p-6 md:p-10 shadow-xs">
          <h3 className="text-lg font-black text-stone-800 mb-6 flex items-center gap-2">
            <span>💬</span> نظرات کاربران ({comments.length})
          </h3>

          {/* فرم ثبت نظر جدید */}
          <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text"
                placeholder="نام و نام خانوادگی"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                className="w-full bg-stone-50/70 border border-stone-100 focus:border-pink-300 focus:bg-white rounded-xl py-2 px-4 outline-none text-xs transition-all"
                required
              />
            </div>
            <textarea 
              placeholder="دیدگاه یا سوال خود را درباره این مقاله بنویسید..."
              rows={4}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-100 focus:border-pink-300 focus:bg-white rounded-xl py-3 px-4 outline-none text-xs transition-all resize-none"
              required
            ></textarea>
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer border-0">
              ثبت و انتشار نظر
            </button>
          </form>

          {/* لیست نمایش کامنت‌ها */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-stone-50/50 border border-stone-100/60 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-stone-800 text-xs">👤 {comment.author}</span>
                  <span className="text-[10px] text-stone-400 font-medium">{comment.date}</span>
                </div>
                <p className="text-stone-600 text-xs leading-6 text-justify">{comment.text}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}