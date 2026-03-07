"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";
import { API_URL } from "@/config/api";

export default function CheckoutPage() {

  const { cartTotal, cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const deliveryCharge = cartTotal > 0 ? 25 : 0;
  const handlingCharge = cartTotal > 0 ? 2 : 0;
  const grandTotal = cartTotal + deliveryCharge + handlingCharge;

  const handlePayment = async () => {

    if (!cart.length) {
      alert("Cart empty");
      return;
    }

    setLoading(true);

    /* Load Razorpay Script */

    if (!window.Razorpay) {

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      await new Promise((resolve) => {
        script.onload = resolve;
      });

    }

    const options = {

      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: grandTotal * 100,
      currency: "INR",
      name: "Web Loxic Store",
      description: "Order Payment",

      handler: async function (response) {

  try {

    const res = await fetch(`${API_URL}/place-order`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        signature: response.razorpay_signature,

        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
          price: item.price
        })),

        total: cartTotal,
        delivery_charge: deliveryCharge,
        handling_charge: handlingCharge,
        grand_total: grandTotal

      })

    });

    const data = await res.json();

    if (data.status || data.success) {

      clearCart();

      // ✅ redirect success page
      window.location.href = `/order-success?order_id=${data.order.id}`;

    }

  } catch (error) {

    console.log("Place order error:", error);

  }

},

      theme: {
        color: "#a32b16"
      }

    };

    const rzp = new window.Razorpay(options);

    rzp.open();

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-12">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Order Summary
        </h2>

        {/* Cart Items */}

        <div className="space-y-5">

          {cart.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >

              <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">

                <Image
                  src={item.image || "/next.svg"}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />

              </div>

              <div className="flex-1">

                <p className="font-medium text-sm md:text-base">
                  {item.name}
                </p>

                <p className="text-xs text-gray-500">
                  ₹{item.price} × {item.qty}
                </p>

              </div>

              <div className="text-sm font-semibold">
                ₹{item.price * item.qty}
              </div>

            </div>

          ))}

        </div>

        {/* Bill Section */}

        <div className="mt-6 border-t pt-4 space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Items Total</span>
            <span>₹{cartTotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <div className="flex justify-between">
            <span>Handling Charge</span>
            <span>₹{handlingCharge}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

        </div>

        {/* Pay Button */}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₹${grandTotal}`}
        </button>

      </div>

    </div>

  );

}