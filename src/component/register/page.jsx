"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/config/api";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const router = useRouter();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.status || res.ok) {

        alert("Registration Successful 🎉");

        router.push("/auth/login");

      } else {

        alert(data.message || "Registration failed");

      }

    } catch (error) {

      console.error(error);
      alert("Server error");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100 px-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-orange-400"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-orange-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-orange-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-xl font-semibold">
            Register
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">

          Already have an account?{" "}

          <Link
            href="/auth/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}