"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartDrawer({ open, onClose }) {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, cartTotal } = useCart();

  const deliveryCharge = cartTotal > 0 ? 25 : 0;
  const handlingCharge = cartTotal > 0 ? 2 : 0;

  const [tip, setTip] = useState(0);
  const [donation, setDonation] = useState(false);

  const grandTotal =
    cartTotal + deliveryCharge + handlingCharge + tip + (donation ? 1 : 0);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* RIGHT SIDE DRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-full
          w-full md:w-[420px]
          bg-[#f5f6fa]
          z-50
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="bg-white p-4 flex items-center gap-3 shadow-sm">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          <h2 className="font-semibold text-lg">My Cart</h2>
        </div>

        {/* Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Delivery */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Delivery in 8 minutes</h3>
            <p className="text-xs text-gray-500">
              Shipment of {cart.length} item(s)
            </p>

            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 mt-4 items-center">
                <div className="relative w-16 h-16 bg-gray-100 rounded">
                  <Image
                    src={item.image || item.images?.[0] || "/next.svg"}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-gray-500">₹{item.price}</p>
                </div>

                <div className="flex items-center bg-red-600 text-white rounded-md">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1"
                  >
                    -
                  </button>
                  <span className="px-3">{item.qty}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-1"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bill Details */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Bill details</h3>

            <div className="flex justify-between text-sm mb-2">
              <span>Items total</span>
              <span>₹{cartTotal}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Delivery charge</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Handling charge</span>
              <span>₹{handlingCharge}</span>
            </div>

            <div className="flex justify-between font-semibold mt-3">
              <span>Grand total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          {/* Donation */}
          <div className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
            <div>
              <h4 className="font-medium text-sm">
                Feeding India donation
              </h4>
              <p className="text-xs text-gray-500">
                Working towards a malnutrition free India
              </p>
            </div>

            <input
              type="checkbox"
              checked={donation}
              onChange={() => setDonation(!donation)}
              className="w-5 h-5"
            />
          </div>

          {/* Tip */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-medium text-sm mb-3">
              Tip your delivery partner
            </h4>

            <div className="flex gap-3">
              {[20, 30, 50].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTip(amount)}
                  className={`px-4 py-2 rounded-lg border ${
                    tip === amount
                      ? "bg-red-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Cancellation */}
          <div className="bg-white rounded-xl p-4 shadow-sm text-xs text-gray-500">
            <h4 className="font-medium text-sm mb-2 text-black">
              Cancellation Policy
            </h4>
            Orders cannot be cancelled once packed for delivery.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-red-700 text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">₹{grandTotal}</p>
              <p className="text-xs">TOTAL</p>
            </div>

           <button
  onClick={() => {
    onClose();
    router.push("/checkout");
  }}
  className="bg-red-600 px-6 py-2 rounded-lg"
>
  Proceed →
</button>
          </div>
        </div>
      </div>
    </>
  );
}