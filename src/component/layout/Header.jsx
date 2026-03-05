"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronDown
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import CartDrawer from "@/component/cart/CartDrawer";
import BottomCartBar from "@/component/cart/BottomCartBar";

export default function Header() {

  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const { cartCount } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpenAccount(false);
  };

  return (

    <>

      <header className="sticky top-0 z-50 bg-white">

        {/* TOP BAR */}

        <div className="bg-red-600 text-white text-sm text-center py-2">
          Get free shipping on all orders over 500/- For bulk orders call us at +00000000000 →
        </div>

        {/* MOBILE HEADER */}

        <div className="md:hidden flex items-center justify-between px-4 h-16 bg-white">

          <div className="flex items-center gap-4">

            <button onClick={() => setOpenMenu(!openMenu)}>
              {openMenu ? <X size={24} /> : <Menu size={24} />} </button>

            <Search size={22} />

          </div>

          <Link href="/">
            <img src="/assets/images/product/bobbylogo1.png" className="h-20" />
          </Link>

          <button onClick={() => setOpenCart(true)} className="relative">

            <ShoppingCart size={22} />

            {cartCount > 0 && (<span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount} </span>
            )}

          </button>

        </div>

        {/* DESKTOP HEADER */}

        <div className="hidden md:block">

          <div className="max-w-[1250px] mx-auto flex items-center justify-between h-20 px-10">

            <Search size={22} />

            <Link href="/">
              <img src="/assets/images/product/bobbylogo1.png" className="h-30" />
            </Link>

            <div className="flex items-center gap-6">

              {!user ? (

                <Link href="/auth/login">
                  <User size={22} />
                </Link>

              ) : (

                <div ref={dropdownRef} className="relative">

                  <User
                    size={22}
                    className="cursor-pointer"
                    onClick={() => setOpenAccount(!openAccount)}
                  />

                  {openAccount && (

                    <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-lg p-4">

                      <p className="font-semibold mb-2">
                        {user.email}
                      </p>

                      <Link href="/account/orders" className="block mb-2">
                        Orders
                      </Link>

                      <button onClick={handleLogout} className="text-red-600">
                        Logout
                      </button>

                    </div>

                  )}

                </div>

              )}

              <button onClick={() => setOpenCart(true)} className="relative">

                <ShoppingCart size={22} />

                {cartCount > 0 && (<span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount} </span>
                )}

              </button>

            </div>

          </div>

          {/* DESKTOP MENU */}

          <div>

            <div className="max-w-[1200px] mx-auto flex justify-center gap-10 py-4 text-sm font-medium">

              <Link href="/">Home</Link>

              <Link href="/collections/digestive" className="flex items-center gap-1">
                Digestive <ChevronDown size={14} />
              </Link>

              <Link href="/collections/mouth-freshner">Mouth Fresheners</Link>

              <Link href="/collections/namkeens">Namkeens</Link>

              <Link href="/collections/sweets">Sweets</Link>

              <Link href="/collections/free-shipping-combo-packs">Free Delivery Combo</Link>

              <Link href="/collections/gift-packs">Gift Packs</Link>

            </div>

          </div>

        </div>

      </header>

      {/* MOBILE SLIDE PANEL */}

      <div className={`fixed top-[104px] left-0 h-[calc(100vh-104px)] w-full z-40 md:hidden transition-transform duration-300 ${openMenu ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="h-full bg-[#e7e5b7] flex flex-col">

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 text-lg font-semibold">

            <Link href="/" onClick={() => setOpenMenu(false)} className="block">
              Home
            </Link>

            <Link href="/collections/digestive" onClick={() => setOpenMenu(false)} className="flex justify-between items-center">
              Digestive
              <ChevronRight size={18} />
            </Link>

            <Link href="/collections/mouth-freshner" onClick={() => setOpenMenu(false)} className="block">
              Mouth Fresheners
            </Link>

            <Link href="/collections/namkeens" onClick={() => setOpenMenu(false)} className="block">
              Namkeens
            </Link>

            <Link href="/collections/sweets" onClick={() => setOpenMenu(false)} className="block">
              Sweets
            </Link>

            <Link href="/collections/free-shipping-combo-packs" onClick={() => setOpenMenu(false)} className="block">
              Free Delivery Combo
            </Link>

            <Link href="/collections/gift-packs" onClick={() => setOpenMenu(false)} className="block">
              Gift Packs
            </Link>

          </div>

          <div className="px-6 py-6">

            <Link href="/account" className="flex items-center gap-2 mb-4">
              <User size={20} /> Account
            </Link>

            <div className="flex gap-6 text-xl">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
            </div>

          </div>

        </div>

      </div>

      <BottomCartBar onClick={() => setOpenCart(true)} />

      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />

    </>

  );

}
