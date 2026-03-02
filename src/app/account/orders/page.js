"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // API call
    setOrders([]);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">

        <div className="text-6xl mb-6">🛍️</div>

        <h2 className="text-2xl font-semibold mb-2">
          Oops! You haven't placed any orders yet
        </h2>

        <p className="text-gray-500">
          Start shopping to place your first order.
        </p>
      </div>
    );
  }

  return <div>Orders List Here</div>;
}