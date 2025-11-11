"use client";
import { useState } from "react";
import {
  Grid,
  Smartphone,
  Shirt,
  BookOpen,
  Sofa,
  Box,
} from "lucide-react"; // Tambahkan ikon-ikon yang relevan

const categories = [
  { name: "Semua", icon: Grid },
  { name: "Elektronik", icon: Smartphone },
  { name: "Fashion", icon: Shirt },
  { name: "Buku", icon: BookOpen },
  { name: "Furnitur", icon: Sofa },
  { name: "Lainnya", icon: Box },
];

export default function CategoryFilter() {
  const [active, setActive] = useState("Semua");

  return (
    <div className="flex flex-wrap gap-2 pl-4 mt-3">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.name;

        return (
          <button
            key={cat.name}
            onClick={() => setActive(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md border transition-all duration-150
              ${isActive
                ? "bg-[#4f7f8d] text-white border-[#4f7f8d]"
                : "bg-[#f3f3f3] text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
          >
            <Icon size={16} className={isActive ? "text-white" : "text-gray-500"} />
            <span className="font-medium">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
