"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/config/api";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const router = useRouter();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("email", form.email);
      formData.append("password", form.password);

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.status) {

        /* SAVE USER */

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login successful");

        router.push("/");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Server Error");

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

      {/* FORM */}

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
                required
                className="w-full mt-2 p-3 rounded-xl border"
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
                required
                className="w-full mt-2 p-3 rounded-xl border"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

            </div>

            <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold">
              Login
            </button>

          </form>

          <p className="text-center text-sm text-gray-600 mt-6">

            Don’t have an account?{" "}

            <Link
              href="/auth/register"
              className="text-orange-600 font-semibold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}