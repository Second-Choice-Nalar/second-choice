"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, MessageCircle, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ProductImage {
  url: string;
}

interface ProductDetail {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  images: ProductImage[];
  campus: { name: string };
  category: { name: string };
  seller: { id: string; name: string };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = {
          data: {
            id: "cmhw5ck0e0001hpu0jwdomruy",
            productName: "Celana Jeans",
            description: "Celana Panjang Ukuran XL",
            price: 10000,
            stock: 2,
            status: "AVAILABLE",
            campusId: "cmhrvqeo20001hpt83guxipy5",
            sellerId: "GqF2pBEMJprU8IYOEjhRjtMChntUCI12",
            createdAt: "...",
            updatedAt: "...",
            categoryId: 2,
            images: [
              {
                url: "https://owceerjopcopmqwbsjyu.supabase.co/storage/v1/object/public/product-images/products/GqF2pBEMJprU8IYOEjhRjtMChntUCI12-1762960810303.png",
              },
              {
                url: "https://owceerjopcopmqwbsjyu.supabase.co/storage/v1/object/public/product-images/products/GqF2pBEMJprU8IYOEjhRjtMChntUCI12-1762960811142.png",
              },
            ],
            campus: { name: "Institut Teknologi Bandung" },
            seller: {
              name: "Fahri Nr",
              id: "GqF2pBEMJprU8IYOEjhRjtMChntUCI12",
            },
            category: { name: "Pakaian Pria" },
          },
        };

        setProduct(res.data);

        if (res.data?.images?.length > 0) {
          setActiveImage(res.data.images[0].url);
        }
      } catch (error) {
        console.error("Gagal fetch produk:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat detail produk...
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* HEADER WITH BACK BUTTON */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-xl font-semibold">Detail Produk</h2>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* LEFT: Images */}
        <div className="col-span-5">
          <div className="w-full h-[420px] bg-gray-200 rounded-xl overflow-hidden">
            <Image
              src={activeImage}
              alt={product.productName}
              width={800}
              height={800}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(img.url)}
                className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border ${
                  activeImage === img.url
                    ? "border-[#4f7f8d]"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={img.url}
                  width={200}
                  height={200}
                  alt="thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Text section */}
        <div className="col-span-7">
          <h1 className="text-3xl font-semibold text-gray-800 leading-snug">
            {product.productName}
          </h1>

          <p className="text-sm text-[#4f7f8d] underline mt-1 cursor-pointer">
            {product.category.name}
          </p>

          {/* Price & Stock */}
          <div className="mt-4 bg-white border rounded-xl p-5">
            <p className="text-3xl font-bold text-[#4f7f8d]">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Stok tersisa : {product.stock}
            </p>
          </div>

          {/* ACTION BUTTONS — MOVED TO SEPARATE CARD */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`flex-1 py-3 border rounded-lg flex items-center justify-center gap-2 transition ${
                isFavorited
                  ? "bg-red-50 border-red-300 text-red-500"
                  : "bg-white border-gray-300"
              }`}
            >
              <Heart
                size={18}
                className={isFavorited ? "fill-red-500 text-red-500" : ""}
              />
              Tambahkan Favorit
            </button>

            <button className="flex-1 py-3 bg-[#4f7f8d] text-white rounded-lg flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Chat Penjual
            </button>
          </div>

          {/* Seller Section */}
          <div className="bg-white border rounded-xl p-5 mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                {product.seller.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {product.seller.name}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} />
                  <span>{product.campus.name}</span>
                </div>
              </div>
            </div>

            <Link
              href={`/toko/${product.seller.id}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
            >
              Kunjungi Toko
            </Link>
          </div>

          {/* Description */}
          <div className="bg-white border rounded-xl p-5 mt-6">
            <h3 className="font-semibold text-[#4f7f8d] mb-2">
              Deskripsi Barang
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
