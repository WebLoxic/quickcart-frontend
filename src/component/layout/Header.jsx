"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  MapPin,
  User,
  ChevronDown
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import CartDrawer from "@/component/cart/CartDrawer";
import BottomCartBar from "@/component/cart/BottomCartBar";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [location] = useState("223a, Commercial Complex, Gopal Nagar");
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const { cartCount } = useCart();

  /* =========================
     CHECK LOGIN STATUS
  ========================== */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="bg-yellow-400 sticky top-0 z-40 shadow-sm">

        {/* ===== MOBILE HEADER ===== */}
        <div className="md:hidden px-4 py-3">

          {/* TOP ROW */}
          <div className="flex justify-between items-start">

            <div>
              <p className="font-bold text-black text-sm">
                Delivery in 10 minutes
              </p>

              <div className="flex items-center gap-1 text-xs text-black mt-1">
                <span className="truncate max-w-[180px]">
                  Home - {location}
                </span>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="flex items-center gap-3">

              {/* CART ICON */}
              <button
                className="relative"
                onClick={() => setOpenCart(true)}
              >
                <ShoppingCart size={22} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* USER ICON */}
              <Link href={user ? "#" : "/auth/login"}>
                <User size={22} />
              </Link>

            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="mt-4">
            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-sm">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search "butter"'
                className="w-full outline-none px-2 text-sm"
              />
            </div>
          </div>

        </div>

        {/* ===== DESKTOP HEADER ===== */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 py-4 items-center justify-between">

          <Link href="/" className="text-2xl font-bold text-black">
            QuickCart
          </Link>

          <div className="flex items-center gap-2 text-sm text-black">
            <MapPin size={16} />
            <span>Delivery in 10 minutes</span>
          </div>

          <div className="flex-1 mx-8">
            <div className="flex items-center bg-white rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full outline-none px-2 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">

            {!user ? (
              <Link href="/auth/login" className="font-semibold">
                Login
              </Link>
            ) : (
              <User size={22} />
            )}

            <button
              onClick={() => setOpenCart(true)}
              className="relative bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Cart

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>

      </header>

      {/* ================= BOTTOM CART BAR (MOBILE ONLY) ================= */}
      <BottomCartBar onClick={() => setOpenCart(true)} />

      {/* ================= CART DRAWER ================= */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  );
}