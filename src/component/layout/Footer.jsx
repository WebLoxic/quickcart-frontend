"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {

  return (

    <footer className="bg-[#c63d3d] text-white mt-20">

      <div className="max-w-[1250px] mx-auto px-6 py-16">

        {/* GRID */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* LOGO SECTION */}

          <div className="col-span-2 md:col-span-1">

            <img
              src="/assets/images/product/satmolalogo.png"
              className="h-12 mb-4"
            />

            <p className="text-sm mb-6">
              SSG Pharma Pvt. Ltd.
            </p>

            <div className="flex gap-4">

              <Facebook size={18} />
              <Instagram size={18} />
              <Youtube size={18} />
              <Twitter size={18} />

            </div>

          </div>

          {/* MENU 1 */}

          <div>

            <h4 className="font-semibold mb-4">
              Menu
            </h4>

            <ul className="space-y-3 text-sm">

              <li>
                <Link href="/collections/digestive">
                  Tasty & Digestive Candy
                </Link>
              </li>

              <li>
                <Link href="/collections/namkeens">
                  Namkeens
                </Link>
              </li>

              <li>
                <Link href="/collections/sweets">
                  Sweets
                </Link>
              </li>

              <li>
                <Link href="/collections/digestive">
                  Digestive Candy JAR
                </Link>
              </li>

              <li>
                <Link href="/collections/mouth-freshner">
                  Mouth Freshener
                </Link>
              </li>

            </ul>

          </div>

          {/* MENU 2 */}

          <div>

            <h4 className="font-semibold mb-4">
              Menu
            </h4>

            <ul className="space-y-3 text-sm">

              <li>
                <Link href="/collections/free-shipping-combo-packs">
                  Free Shipping Combo
                </Link>
              </li>

              <li>
                <Link href="/collections/gift-packs">
                  Special Combo
                </Link>
              </li>

            </ul>

          </div>

          {/* CORPORATE */}

          <div>

            <h4 className="font-semibold mb-4">
              Corporate
            </h4>

            <ul className="space-y-3 text-sm">

              <li>
                <Link href="#">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="#">
                  Dealership Form
                </Link>
              </li>

            </ul>

          </div>

          {/* POLICIES */}

          <div>

            <h4 className="font-semibold mb-4">
              Policies
            </h4>

            <ul className="space-y-3 text-sm">

              <li>
                <Link href="#">
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link href="#">
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link href="#">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="#">
                  Terms & Conditions
                </Link>
              </li>

            </ul>

          </div>

        </div>

        {/* DIVIDER */}

        <div className="border-t border-red-300 mt-14 pt-6 text-center text-sm">

          © 2026 Satmola. All Rights Reserved.

        </div>

      </div>

    </footer>

  );

}
