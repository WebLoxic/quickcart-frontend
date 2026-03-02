import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ Import Header & Footer
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";

// ✅ Import CartProvider
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickCart",
  description: "Modern E-commerce UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* ✅ Wrap Entire App Inside CartProvider */}
        <CartProvider>

          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <Footer />

        </CartProvider>
      </body>
    </html>
  );
}