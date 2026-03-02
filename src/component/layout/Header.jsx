"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Search,
  User,
  ChevronDown
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import CartDrawer from "@/component/cart/CartDrawer";
import BottomCartBar from "@/component/cart/BottomCartBar";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [location] = useState("223a, Commercial Complex, Gopal Nagar");
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const { cartCount } = useCart();

  /* ================= LOGIN CHECK ================= */
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  /* ================= OUTSIDE CLICK CLOSE (DESKTOP) ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpenAccount(false);
  };

  return (
    <>
      <header className="bg-yellow-400 sticky top-0 z-40 shadow-sm">

        {/* ================= MOBILE ================= */}
        <div className="md:hidden px-4 py-3">

          {/* Top Row */}
          <div className="flex justify-between items-start">

            <div className="flex items-center gap-1 text-xs text-black">
              <span className="truncate max-w-[200px]">
                Home - {location}
              </span>
              <ChevronDown size={14} />
            </div>

            <div className="flex items-center gap-3">

              {/* Cart */}
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

              {/* User */}
              {!user ? (
                <Link href="/auth/login">
                  <User size={22} />
                </Link>
              ) : (
                <button onClick={() => setOpenAccount(!openAccount)}>
                  <User size={22} />
                </button>
              )}

            </div>
          </div>

          {/* Search */}
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

         {/* ================= FULL SCREEN MOBILE ACCOUNT ================= */}
{openAccount && user && (
  <div className="fixed inset-0 bg-gray-100 z-50 md:hidden flex flex-col">

    {/* Top Bar */}
    <div className="bg-yellow-400 px-4 py-3 flex items-center justify-between">
      <button
        onClick={() => setOpenAccount(false)}
        className="text-black text-lg font-semibold"
      >
        ←
      </button>

      <div className="text-center">
        <p className="font-bold text-black">Delivery in 10 minutes</p>
        <p className="text-xs text-black truncate max-w-[200px]">
          Home - {location}
        </p>
      </div>

      <div></div>
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto px-4 py-6">

      <p className="text-lg font-semibold mb-6">
        {user.email}
      </p>

      <p className="text-gray-500 text-sm mb-4">
        Your Information
      </p>

      <div className="space-y-4">

        <Link href="/account/order" onClick={() => setOpenAccount(false)}
          className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
          <span>📦</span> Order History
        </Link>

        <Link href="#" className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
          <span>📍</span> Address Book
        </Link>

        <Link href="#" className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
          <span>💳</span> Wallet Details
        </Link>

        <Link href="#" className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
          <span>📝</span> My Prescriptions
        </Link>

        <Link href="#" className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
          <span>🎁</span> E-Gift Cards
        </Link>

        <Link href="#" className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
          <span>🔒</span> Account Privacy
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm text-red-600 w-full text-left"
        >
          🚪 Logout
        </button>

      </div>
    </div>

  </div>
)}

        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 py-4 items-center justify-between">

          <Link href="/" className="text-2xl font-bold text-black">
            QuickCart
          </Link>

          {/* Search */}
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

          {/* Right Section */}
          <div className="flex items-center gap-6 relative">

            {!user ? (
              <Link href="/auth/login" className="font-semibold">
                Login
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenAccount(!openAccount)}
                  className="flex items-center gap-2 font-semibold text-black hover:text-gray-700"
                >
                  <User size={18} />
                  My Account
                </button>

                {openAccount && (
                  <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-lg p-4 z-50">

                    <div className="border-b pb-3 mb-3">
                      <p className="font-semibold text-gray-800">
                        My Account
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 text-sm text-gray-700">
                      <Link href="/account/orders">My Orders</Link>
                      <Link href="#">Saved Addresses</Link>
                      <Link href="#">My Prescriptions</Link>
                      <Link href="#">E-Gift Cards</Link>
                      <Link href="#">FAQ's</Link>
                      <Link href="#">Account Privacy</Link>

                      <button
                        onClick={handleLogout}
                        className="text-left text-red-600 font-medium"
                      >
                        Log Out
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* Cart */}
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

      <BottomCartBar onClick={() => setOpenCart(true)} />

      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  );
}