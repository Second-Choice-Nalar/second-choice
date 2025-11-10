"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function EmailConfirmationPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      alert("Mohon masukkan kode dari email Anda.");
      return;
    }
    
    console.log("Memverifikasi kode:", code);
    alert("Kode terverifikasi! (simulasi). Anda akan diarahkan untuk membuat password baru.");
    
    router.push("/create-new-password"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#32515a] via-[#89b4bb] to-white">
      <div className="bg-white w-[420px] rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_25px_rgba(79,127,140,0.5)] px-8 py-10 text-center">
        
        <div className="flex justify-center mb-4">
          <CheckCircle2 size={48} className="text-[#4F7F8C]" />
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
          Email Terkirim!
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          Kami telah mengirimkan instruksi reset password ke alamat email Anda.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Mohon isi kode konfirmasi"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700"
          />

          <p className="text-xs text-gray-500 text-left !mt-2">
            Tidak menerima email? Cek folder spam Anda.
          </p>

          <button
            type="submit"
            onClick={() => router.push("/signin")}
            className="w-full bg-[#4F7F8C] text-white py-2 px-4 rounded-md font-medium hover:bg-[#42707d] transition flex items-center justify-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Kembali ke Sign In
          </button>
        </form>
      </div>
    </div>
  );
}