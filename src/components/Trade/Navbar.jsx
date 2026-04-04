
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@base-ui/react";


export default function Navbar() {
    const pathname = usePathname();


  const linkClass = (path) =>
    `transition ${
      pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-600 hover:text-black"
    }`;
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight cursor-pointer">
            📊 <span className="text-blue-600">Trade</span>Track
          </h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className={linkClass("/")}>
            Dashboard
          </Link>

          <Link href="/analytics"  className={linkClass("/analytics")}>
            Analytics
          </Link>

          <Link href="/history" className={linkClass("/history")}>
            History
          </Link>
        </nav>

        {/* Right */}
        <div>
          <Link href="/">
            <button className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition">
              + Add Trade
            </button>
          </Link>
           
        </div>

      </div>
    </header>
  );
}
