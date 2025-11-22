"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { LogOut, Edit2, Box, Heart, Star, MapPin } from "lucide-react";
import Link from "next/link";

/* ------------------ INTERFACES ------------------ */
interface UserProfile {
  id: string;
  name: string;
  email: string;
  campus: string;
  district: string;
  avatarUrl?: string; // FOTO PROFIL DARI STORAGE
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  status: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /* ------------------ FETCH DATA PROFILE ------------------ */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await axios.get("/api/user/profile");
        const productRes = await axios.get("/api/user/products");
        const favRes = await axios.get("/api/user/favorites");

        setUser(userRes.data);
        setProducts(productRes.data);
        setFavorites(favRes.data);
      } catch (err) {
        console.error("Gagal mengambil data profil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Tidak dapat memuat profil pengguna.
      </div>
    );
  }

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* TOP PROFILE HEADER */}
      <section className="relative w-full max-w-5xl mx-auto mt-8 px-6">
        {/* Background gradient */}
        <div className="w-full h-40 bg-gradient-to-r from-[#4f7f8d] to-[#1d3c45] rounded-2xl"></div>

        {/* Profile card */}
        <div className="bg-white w-full rounded-2xl shadow-lg p-6 relative -mt-10 flex flex-col">
          <div className="flex">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-600 text-4xl font-semibold border-4 border-white shadow-md">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  width={96}
                  height={96}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span>{initial}</span>
              )}
            </div>

            <div className="ml-5 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h2>

              <p className="text-sm text-gray-600 mt-1">{user.email}</p>

              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {user.campus}
                </span>
                <span>•</span>
                <span>{user.district}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-3">
              <Link
                href="/profile/edit"
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 text-sm rounded-lg transition"
              >
                <Edit2 size={16} className="mr-1" /> Edit Profil
              </Link>

              <button className="flex items-center bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 text-sm rounded-lg transition">
                <LogOut size={16} className="mr-1" /> Keluar
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 mt-8 gap-4 text-center">
            <div className="rounded-xl border p-4 shadow-sm bg-white">
              <Box size={22} className="mx-auto text-gray-700" />
              <p className="font-semibold text-lg">{products.length}</p>
              <p className="text-sm text-gray-500">Total Produk</p>
            </div>

            <div className="rounded-xl border p-4 shadow-sm bg-white">
              <Heart size={22} className="mx-auto text-gray-700" />
              <p className="font-semibold text-lg">{favorites.length}</p>
              <p className="text-sm text-gray-500">Disukai</p>
            </div>

            <div className="rounded-xl border p-4 shadow-sm bg-white">
              <Star size={22} className="mx-auto text-gray-700" />
              <p className="font-semibold text-lg">4.3</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section className="max-w-5xl mx-auto mt-10 px-6">
        <h3 className="font-semibold text-gray-800 text-lg mb-3">Produk</h3>

        <div className="grid grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md p-3 border relative"
            >
              <div className="h-44 bg-gray-200 rounded-lg overflow-hidden">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                ) : null}
              </div>

              <p className="text-sm font-semibold mt-2 text-gray-800">
                {p.name}
              </p>

              <p className="text-[#4f7f8d] font-bold mt-1">
                Rp {p.price.toLocaleString("id-ID")}
              </p>

              <p className="text-xs mt-1 text-green-600">{p.status}</p>

              <Link
                href={`/editproduct/${p.id}`}
                className="text-sm absolute right-3 bottom-3 text-[#4f7f8d] hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAVORITES */}
      <section className="max-w-5xl mx-auto mt-10 px-6 mb-20">
        <h3 className="font-semibold text-gray-800 text-lg mb-3">Favorit</h3>

        <div className="grid grid-cols-4 gap-4">
          {favorites.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md p-3 border relative"
            >
              <div className="h-44 bg-gray-200 rounded-lg overflow-hidden">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                ) : null}
              </div>

              <p className="text-sm font-semibold mt-2 text-gray-800">
                {p.name}
              </p>

              <p className="text-[#4f7f8d] font-bold mt-1">
                Rp {p.price.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
