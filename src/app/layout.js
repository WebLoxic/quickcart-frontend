"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/component/layout/Header";
import ConditionalFooter from "@/component/layout/ConditionalFooter";
import { CartProvider } from "@/context/CartContext";

import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  const pathname = usePathname();

  /* hide header on these routes */

  const hideHeaderRoutes = [
    "/auth/login",
    "/auth/register",
    "/admin"
  ];

  const hideHeader = hideHeaderRoutes.some(route =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>

        <CartProvider>

          {!hideHeader && <Header />}

          <main className="flex-grow">
            {children}
          </main>

          {!hideHeader && <ConditionalFooter />}

        </CartProvider>

      </body>
    </html>
  );
}