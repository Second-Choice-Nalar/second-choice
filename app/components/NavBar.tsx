"use client";

import { useState } from "react";
import {
  Heart,
  Bell,
  MessageSquare,
  User,
  Search,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-8 py-3">
      {/* Baris Atas */}
      <div className="flex items-center justify-between space-x-4">
        {/* Logo & Nama */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <Image
            src="/secondchoice-logo-nobg.png"
            alt="Second Choice Logo"
            width={42}
            height={42}
            className="rounded-md object-cover"
          />
          <h1 className="text-xl font-bold text-gray-800">Second Choice</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cari barang bekas..."
              className="w-full border border-gray-300 rounded-[6px] pl-10 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Tombol +Jual & Ikon */}
        <div className="flex items-center space-x-5">
          {/* Tombol Jual */}
          <Link
            href="/addproduct" // 🔹 ubah dari /jual ke /addproduct
            className="!bg-[#4f7f8d] hover:!bg-[#446e7a] text-white px-6 py-3 rounded-[6px] font-semibold transition shadow-sm"
          >
            + Jual
          </Link>

          {/* Ikon */}
          <div className="flex items-center space-x-5">
            <Link href="/notifications" className="text-gray-700 hover:text-blue-600">
              <Bell size={22} />
            </Link>
            <Link href="/chat" className="text-gray-700 hover:text-blue-600">
              <MessageSquare size={22} />
            </Link>
            <Link href="/favorites" className="text-gray-700 hover:text-blue-600">
              <Heart size={22} />
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">
              <User size={22} />
            </Link>
          </div>
        </div>
      </div>

      {/* Baris Bawah - Lokasi */}
      <div className="flex items-center text-gray-600 text-sm mt-2 ml-1">
        <MapPin size={16} className="text-blue-600 mr-1" />
        <span>Universitas Negeri Semarang, Jawa Tengah</span>
        <ChevronDown size={14} className="ml-1 text-gray-500" />
      </div>

      {/* Menu Mobile */}
      <button
        className="md:hidden text-gray-700 hover:text-blue-600 ml-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Dropdown Mobile */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center space-y-4 py-4 z-50">
          <div className="relative w-10/12">
            <input
              type="text"
              placeholder="Cari barang bekas..."
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* Tombol Jual di menu mobile */}
          <Link
            href="/addproduct" // 🔹 juga diarahkan ke laman addproduct
            className="!bg-[#4f7f8d] hover:!bg-[#446e7a] text-white px-6 py-3 rounded-[6px] font-semibold transition shadow-sm"
          >
            + Jual
          </Link>

          <div className="flex space-x-6">
            <Link href="/notifications" className="text-gray-700 hover:text-blue-600">
              <Bell size={22} />
            </Link>
            <Link href="/chat" className="text-gray-700 hover:text-blue-600">
              <MessageSquare size={22} />
            </Link>
            <Link href="/favorites" className="text-gray-700 hover:text-blue-600">
              <Heart size={22} />
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">
              <User size={22} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
