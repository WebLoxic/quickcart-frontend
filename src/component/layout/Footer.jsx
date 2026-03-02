import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* LOGO + ABOUT */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-black mb-4">
              QuickCart
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your everyday grocery partner. Fresh products delivered
              fast and safely at your doorstep.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-semibold text-black mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Press</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-semibold text-black mb-4">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms & Conditions</Link></li>
              <li><Link href="#">Refund Policy</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-black mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Email: support@quickcart.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Sonipat, Haryana</li>
            </ul>
          </div>

          {/* APP DOWNLOAD */}
          <div>
            <h4 className="font-semibold text-black mb-4">
              Download App
            </h4>

            <div className="space-y-3">
              <button className="w-full bg-black text-white py-2 rounded-lg text-sm">
                Download on App Store
              </button>

              <button className="w-full bg-black text-white py-2 rounded-lg text-sm">
                Get it on Google Play
              </button>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} QuickCart. All rights reserved.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 text-gray-600">
            <Facebook size={18} className="cursor-pointer hover:text-black" />
            <Instagram size={18} className="cursor-pointer hover:text-black" />
            <Twitter size={18} className="cursor-pointer hover:text-black" />
          </div>

        </div>

      </div>

    </footer>
  );
}