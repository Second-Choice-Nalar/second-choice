"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Mohon masukkan email Anda.");
      return;
    }

    try {
      // simulasi pengiriman email reset
      alert("Instruksi reset password telah dikirim ke email Anda.");
      router.push("/signin");
    } catch (error: unknown) {
      // tipe 'unknown' aman — tidak melanggar ESLint
      if (error instanceof Error) {
        console.error("Error saat mengirim instruksi reset:", error.message);
      } else {
        console.error("Terjadi kesalahan yang tidak diketahui:", error);
      }
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#32515a] via-[#89b4bb] to-white">
      <div className="bg-white w-[420px] rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_25px_rgba(79,127,140,0.5)] px-8 py-10 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
          Lupa Password?
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Masukkan email Anda dan kami akan mengirimkan instruksi untuk mereset password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700"
          />

          <button
            type="submit"
            onClick={() => router.push("/emailconfcode")}
            className="w-full bg-[#4F7F8C] text-white py-2 px-4 rounded-md font-medium hover:bg-[#42707d] transition"
          >
            Kirim Instruksi Reset
          </button>
        </form>

        <div
          className="mt-6 flex items-center justify-center text-sm text-gray-500 hover:text-[#4F7F8C] cursor-pointer transition"
          onClick={() => router.push("/signin")}
        >
          <ArrowLeft size={16} className="mr-1" />
          Kembali ke Sign In
        </div>
      </div>
    </div>
  );
}
