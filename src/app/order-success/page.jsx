"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {

  const params = useSearchParams();
  const orderId = params.get("order_id");

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-4">
          Your order has been placed successfully.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Order ID: <span className="font-semibold">{orderId}</span>
        </p>

        <Link
          href="/"
          className="bg-red-600 text-white px-6 py-3 rounded-lg inline-block"
        >
          Continue Shopping
        </Link>

      </div>

    </div>

  );

}