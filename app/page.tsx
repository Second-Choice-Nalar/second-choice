import Navbar from "./components/NavBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Kategori - nempel kiri tapi dengan jarak halus */}
      <div className="w-full pl-4 mt-3">
        <CategoryFilter />
      </div>

      {/* Produk tetap di tengah */}
      <section className="max-w-[1500px] mx-auto p-6">
        <h2 className="text-xl font-semibold mt-6 mb-4 text-black">
          Semua Barang
        </h2>
        <ProductGrid />
      </section>
    </main>
  );
}
