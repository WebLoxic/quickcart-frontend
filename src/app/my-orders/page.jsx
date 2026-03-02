"use client";

import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 && (
        <p className="text-gray-500">
          No orders found.
        </p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl p-5"
          >
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-semibold">
                  Order #{order.id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₹{order.total_amount}
                </p>
                <p className="text-sm text-green-600">
                  {order.status}
                </p>
              </div>
            </div>

            <div className="border-t pt-3 space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                  <span>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}