"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Product } from "@/lib/types/product";

// const products = [
//   {
//     name: "Musang Bekasi Birahi",
//     price: 90000,
//     seller: "Edy Gaming",
//     location: "Universitas Negeri Semarang",
//   },
//   {
//     name: "Kakang Purwokerto Musim Kawin",
//     price: 50000,
//     seller: "Nanang",
//     location: "Universitas Negeri Semarang",
//   },
//   {
//     name: "Novel Siksa Kubur",
//     price: 15000,
//     seller: "Yono",
//     location: "Universitas Negeri Semarang",
//   },
//   {
//     name: "Meja Belajar",
//     price: 20000,
//     seller: "Slamet",
//     location: "Universitas Negeri Semarang",
//   },
//   {
//     name: "Kursi Gaming",
//     price: 200000,
//     seller: "Budi 01092",
//     location: "Universitas Negeri Semarang",
//   },
//   {
//     name: "Sepu Bek",
//     price: 5000,
//     seller: "Zainal",
//     location: "Universitas Negeri Semarang",
//   },
//   {
//     name: "Novel Siksa Kubur",
//     price: 15000,
//     seller: "Yono",
//     location: "Universitas Negeri Semarang",
//   },
//   {
//     name: "Catur",
//     price: 18000,
//     seller: "Toharo",
//     location: "Universitas Negeri Semarang",
//   },
// ];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products");
        // console.log("FULL RESPONSE:", res); // liat ini
        // console.log("DATA:", res.data); // liat ini
        const products = res.data;

        setProducts(products);
      } catch (error) {}
    };

    fetchData();
  }, []);
  console.log(products);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1500px] mx-auto">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.productName}
          price={product.price}
          seller={product.seller?.name}
          location={product.campus?.name}
          imageUrl={product.images?.[0]?.url}
        />
      ))}
    </div>
  );
}
