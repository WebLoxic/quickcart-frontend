"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MapPin,
  Package,
  FileText,
  Gift,
  Lock,
  LogOut,
  ArrowLeft
} from "lucide-react";

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "My Addresses", href: "/account/addresses", icon: MapPin },
    { name: "My Orders", href: "/account/orders", icon: Package },
    { name: "My Prescriptions", href: "/account/prescriptions", icon: FileText },
    { name: "E-Gift Cards", href: "/account/gift-cards", icon: Gift },
    { name: "Account Privacy", href: "/account/privacy", icon: Lock },
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isRootAccount = pathname === "/account";

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto bg-white mt-6 md:mt-10 rounded-xl shadow-sm grid md:grid-cols-[250px_1fr]">

        {/* ================= SIDEBAR ================= */}
        {(!isMobile || isRootAccount) && (
          <div className="border-r border-gray-200 p-6">

            <p className="font-semibold mb-6">
              +91 9793333958
            </p>

            <div className="space-y-4">
              {menu.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm transition ${
                      active
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}

              <button className="flex items-center gap-3 p-3 text-sm text-red-600 hover:bg-gray-50 rounded-lg w-full text-left">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* ================= CONTENT ================= */}
        {(!isMobile || !isRootAccount) && (
          <div className="p-6 md:p-8 w-full">

            {/* Mobile Back Button */}
            {isMobile && !isRootAccount && (
              <div className="mb-4 flex items-center gap-2">
                <button
                  onClick={() => router.push("/account")}
                  className="flex items-center gap-1 text-sm font-medium"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              </div>
            )}

            {children}
          </div>
        )}

      </div>
    </div>
  );
}