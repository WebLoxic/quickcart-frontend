"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Image,
  BarChart
} from "lucide-react";

export default function Sidebar({ open }) {

  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/admin/dashboard"
    },
    {
      name: "Products",
      icon: Package,
      link: "/admin/products"
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      link: "/admin/orders"
    },
    {
      name: "Users",
      icon: Users,
      link: "/admin/users"
    },
    {
      name: "Gallery",
      icon: Image,
      link: "/admin/gallery"
    },
    {
      name: "Reports",
      icon: BarChart,
      link: "/admin/reports"
    }
  ];

  return (

    <aside
      className={`bg-white border-r w-64 fixed lg:static inset-y-0 z-50 transform ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } transition-transform duration-200`}
    >

      {/* LOGO */}

      <div className="h-16 flex items-center px-6 border-b">

        <div className="flex items-center gap-2">

          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>

          <span className="font-bold text-lg">
            Remos
          </span>

        </div>

      </div>

      {/* MENU */}

      <nav className="p-4 space-y-2">

        {menu.map((item, i) => {

          const Icon = item.icon;

          const active = pathname === item.link;

          return (

            <Link
              key={i}
              href={item.link}
              className={`flex items-center gap-3 p-3 rounded-lg text-sm transition ${
                active
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >

              <Icon size={18} />

              {item.name}

            </Link>

          );

        })}

      </nav>

    </aside>

  );

}