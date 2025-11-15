"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Save, Send, X } from "lucide-react";
import axios from "axios";
import { Campus, Category } from "../generated/prisma/client";
import Select from "react-select";

type ImagePreview = { file: File; url: string };
interface SelectOption {
  value: string;
  label: string;
}

export default function AddProduct() {
  const [campusOptions, setCampusOptions] = useState<SelectOption[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
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

  // Fetch data kampus dan kategori dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchOptions = async () => {
      // Fetch data kampus
      const campusResponse = await axios.get("/api/campuses");
      const campusData = campusResponse.data;
      const campusOptions: SelectOption[] = campusData.map(
        (campus: Campus) => ({
          value: campus.id,
          label: campus.name,
        })
      );

      // Fetch data kategori
      const categoryResponse = await axios.get("/api/categories");
      const categoryData = categoryResponse.data;
      const categoryOptions: SelectOption[] = categoryData.map(
        (category: Category) => ({
          value: category.id,
          label: category.name,
        })
      );

      setCampusOptions(campusOptions);
      setCategoryOptions(categoryOptions);
    };

    fetchOptions();
  }, []); // Hanya dipanggil sekali setelah komponen dimuat

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Fungsi untuk meng-handle perubahan di select (Kampus)
  const handleCampusChange = (selectedOption: SelectOption | null) => {
    setProduct({ ...product, campus: selectedOption?.value ?? "" });
  };

  // Fungsi untuk meng-handle perubahan di select (Kategori)
  const handleCategoryChange = (selectedOption: SelectOption | null) => {
    setProduct({ ...product, category: selectedOption?.value ?? "" });
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
    alert("Draft produk disimpan sementara ✅");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("stock", product.stock);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("campus", product.campus);

    for (const img of images) {
      formData.append("images", img.file);
    }

    try {
      const response = await axios.post("api/products", formData);

      console.log("Produk berhasil di upload");
    } catch (error) {
      console.error("Gagal mempublikasikan produk:", error);
      alert("Gagal mempublikasikan produk. Cek console untuk detail.");
    }
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
        <h1 className="text-2xl font-bold text-[#008080]">
          Tambah Produk Baru
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Lengkapi detail produk untuk ditampilkan di marketplace
        </p>
      </div>

      {/* Informasi Dasar */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Informasi Dasar
        </h2>
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
            <span className="text-sm font-medium text-gray-700">
              Harga (Rp)
            </span>
            <input
              type="number"
              name="price"
              placeholder="Masukkan harga"
              value={product.price}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg bg-[#f8f8f8] px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
            />
          </label>

          {/* Kategori - React Select */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Kategori</span>
            <Select
              instanceId="kategori-select"
              value={categoryOptions.find(
                (option) => option.value === product.category
              )}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder="Pilih kategori"
              isSearchable={true}
            />
          </label>

          {/* Stok */}
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

        {/* Kampus - React Select */}
        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Kampus</span>
          <Select
            instanceId="kampus-select"
            value={campusOptions.find(
              (option) => option.value === product.campus
            )}
            onChange={handleCampusChange}
            options={campusOptions}
            placeholder="Pilih campus"
            isSearchable={true}
          />
        </label>
      </div>

      {/* Gambar Produk */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Gambar Produk
        </h2>
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
        <button
          onClick={handleSubmit}
          className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg transition text-sm font-medium"
        >
          <Send size={16} className="mr-2" /> Publikasikan
        </button>
      </div>
    </main>
  );
}
