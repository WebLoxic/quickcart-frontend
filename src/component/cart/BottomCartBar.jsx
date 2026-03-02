"use client";

import { useCart } from "@/context/CartContext";

export default function BottomCartBar({ onClick }) {
  const { cartCount, cartTotal } = useCart();

  if (cartCount === 0) return null; // Hide if no items

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-green-600 text-white px-4 py-3 flex items-center justify-between shadow-lg z-50">
      
      <div>
        <p className="text-sm font-semibold">
          {cartCount} items
        </p>
        <p className="text-sm">₹ {cartTotal}</p>
      </div>

      <button
        onClick={onClick}
        className="bg-white text-green-700 font-semibold px-4 py-2 rounded-lg"
      >
        View Cart →
      </button>

    </div>
  );
}