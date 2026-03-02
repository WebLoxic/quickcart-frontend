"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/config/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

 const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  const data = await res.json();

  if (res.ok) {
    // 🔥 SAVE BOTH TOKEN & USER
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // 🔥 Force refresh so Header updates
    window.location.href = "/";
  } else {
    alert(data.message);
  }
};
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* IMAGE SECTION */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="food"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center md:items-start px-6 md:px-16 text-white text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-sm md:text-lg opacity-90 max-w-md">
            Order your favorite food & groceries in minutes.
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100 px-6 py-10">

        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-md">

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Login
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full mt-2 p-3 rounded-xl border focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full mt-2 p-3 rounded-xl border focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform duration-200 shadow-lg">
              Login
            </button>

          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-orange-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}