import { create } from 'zustand';

// ساختار داده‌ها
export const useStore = create((set: any) => ({
  products: [
    { id: 1, name: "کرم مرطوب کننده", price: 185000, stock: 10, image: "🧴" },
    { id: 2, name: "سرم ویتامین سی", price: 420000, stock: 8, image: "🧪" }
  ],
  blogs: [
    { id: 1, title: "روتین پوستی", comments: [] }
  ],
  // متد ادمین برای تغییر موجودی
  updateStock: (id: number, newStock: number) => set((state: any) => ({
    products: state.products.map((p: any) => p.id === id ? {...p, stock: newStock} : p)
  })),
  // متد ادمین برای حذف نظر
  deleteComment: (blogId: number, commentId: number) => set((state: any) => ({
    blogs: state.blogs.map((b: any) => b.id === blogId ? 
      {...b, comments: b.comments.filter((c: any) => c.id !== commentId)} : b)
  }))
}));