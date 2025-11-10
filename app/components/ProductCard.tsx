"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: number;
  seller: string;
  location: string;
  imageUrl?: string;
  id?: string | number;
}

export default function ProductCard({
  id,
  name,
  price,
  seller,
  location,
  imageUrl,
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  // Ambil huruf pertama dari nama penjual
  const sellerInitial = seller ? seller.charAt(0).toUpperCase() : "?";

  return (
    <Link
      href={`/produk/${id ?? name.toLowerCase().replace(/\s+/g, "-")}`}
      className="block group"
    >
      <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition p-3 flex flex-col cursor-pointer border border-transparent hover:border-[#4f7f8d]">
        {/* Gambar produk */}
        <div className="w-full h-[380px] bg-gray-200 rounded-lg overflow-hidden relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Tombol suka */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 rounded-full p-2 shadow-md transition-transform duration-200 hover:scale-110 ${
            isFavorited ? "bg-red-100" : "bg-white"
          }`}
        >
          <Heart
            size={24}
            className={`transition-colors duration-200 ${
              isFavorited ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
          />
        </button>

        {/* Informasi produk */}
        <div className="mt-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 text-base leading-snug line-clamp-2 group-hover:text-[#4f7f8d] transition-colors">
              {name}
            </h3>
            <p className="text-[#4f7f8d] font-bold text-base mt-1">
                Rp {price.toLocaleString("id-ID")}
            </p>
          </div>

          {/* Lokasi dan penjual */}
          <div className="mt-3 border-t border-gray-100 pt-2">
            <div className="flex items-center text-xs text-gray-500">
              <MapPin size={14} className="mr-1 text-gray-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold mr-1 text-gray-600">
                {sellerInitial}
              </div>
              <span>{seller}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
