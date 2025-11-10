"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Save, Send, X } from "lucide-react";

type ImagePreview = { file: File; url: string };

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    campus: "",
  });

  const [images, setImages] = useState<ImagePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Upload handler: buat object URL sekali, simpan url di state
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    const newPreviews = filesArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    // gabungkan tapi batasi maksimal 10
    setImages((prev) => {
      const combined = [...prev, ...newPreviews];
      return combined.slice(0, 10);
    });

    // reset input supaya event bisa dipicu lagi untuk file yang sama
    e.currentTarget.value = "";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Hapus preview tertentu (dan revoke URL)
  const removeImage = (index: number) => {
    setImages((prev) => {
      const toRemove = prev[index];
      if (toRemove) URL.revokeObjectURL(toRemove.url);
      const next = prev.slice();
      next.splice(index, 1);
      return next;
    });
  };

  // Bersihkan semua object URL saat komponen unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  const handleSaveDraft = () => {
    // contoh: tampil alert, nanti bisa diubah untuk POST ke backend
    alert("Draft produk disimpan sementara ✅");
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10 px-6 flex flex-col items-center">
      <style jsx>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-4xl w-full mb-8">
        <h1 className="text-2xl font-bold text-[#008080]">Tambah Produk Baru</h1>
        <p className="text-gray-500 text-sm mt-1">
          Lengkapi detail produk untuk ditampilkan di marketplace
        </p>
      </div>

      {/* Informasi Dasar */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Informasi Dasar</h2>
        <p className="text-sm text-gray-500 mb-5">Detail utama produk anda</p>

        {/* Nama Produk */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Nama Produk</span>
          <input
            type="text"
            name="name"
            placeholder="Masukkan nama produk"
            value={product.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg bg-[#f8f8f8] px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
          />
        </label>

        {/* Deskripsi */}
        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Deskripsi</span>
          <textarea
            name="description"
            placeholder="Jelaskan detail produk, keunggulan, dan spesifikasinya"
            value={product.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border border-gray-300 rounded-lg bg-[#f8f8f8] px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
          />
        </label>

        {/* Harga, Kategori, Stok */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Harga (Rp)</span>
            <input
              type="number"
              name="price"
              placeholder="Masukkan harga"
              value={product.price}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg bg-[#f8f8f8] px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Kategori</span>
            <input
              type="text"
              name="category"
              placeholder="Pilih kategori"
              value={product.category}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg bg-[#f8f8f8] px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Stok</span>
            <input
              type="number"
              name="stock"
              placeholder="Masukkan stok"
              value={product.stock}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg bg-[#f8f8f8] px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
            />
          </label>
        </div>

        {/* Kampus */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Kampus</span>
          <input
            type="text"
            name="campus"
            placeholder="Masukkan nama universitas atau kampus"
            value={product.campus}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg bg-[#f8f8f8] px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
          />
        </label>
      </div>

      {/* Gambar Produk */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Gambar Produk</h2>
        <p className="text-sm text-gray-500 mb-5">Tambah maksimal 10 foto</p>

        {/* Upload Box */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-teal-500 transition cursor-pointer"
          onClick={handleUploadClick}
        >
          <Upload size={32} className="text-gray-500 mb-2" />
          <p className="text-gray-500 text-sm font-medium">Upload</p>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Preview Gambar */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-5 gap-3">
            {images.map((img, i) => (
              <div key={img.url} className="relative">
                <img
                  src={img.url}
                  alt={`preview-${i}`}
                  className="w-full h-24 object-cover rounded-md border"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow"
                  aria-label="Hapus gambar"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tombol */}
      <div className="flex justify-end w-full max-w-4xl space-x-3">
        <button
          onClick={handleSaveDraft}
          className="flex items-center border border-gray-300 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
        >
          <Save size={16} className="mr-2" /> Simpan Draft
        </button>
        <button className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg transition text-sm font-medium">
          <Send size={16} className="mr-2" /> Publikasikan
        </button>
      </div>
    </main>
  );
}
