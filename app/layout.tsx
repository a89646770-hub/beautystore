import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir", // 👈 این متغیر بسیار کلیدی است
});

export const metadata: Metadata = {
  title: "بیوتی‌استور",
  description: "فروشگاه لوازم آرایشی و بهداشتی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="antialiased bg-gray-50 text-gray-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}