"use client";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#32515a] via-[#89b4bb] to-white">
      {/* Container utama */}
      <div className="bg-white w-[850px] h-[500px] rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_25px_rgba(79,127,140,0.5)] flex overflow-hidden transition-shadow duration-500">
        
        {/* Bagian kiri: Form Login */}
        <div className="flex flex-col justify-center items-center w-1/2 p-10">
          <h2 className="text-3xl font-extrabold mb-6 text-black">Sign In</h2>

          {/* Tombol sosial */}
          <div className="flex gap-4 mb-4">
            <button className="border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100 transition">
              <Image src="/google.svg" alt="Google" width={24} height={24} />
            </button>
            <button className="border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100 transition">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={28}
                height={28}
                className="object-contain scale-150"
              />
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-4">
            atau menggunakan email password kamu
          </p>

          {/* Form */}
          <form className="w-full max-w-xs space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700"
            />

            <div className="text-center text-sm text-gray-500 cursor-pointer hover:underline">
              Lupa password?
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#4F7F8C] text-white py-2 px-8 rounded-md font-medium hover:bg-[#42707d] transition"
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>

        {/* Bagian kanan: Info + Sign Up */}
        <div className="relative w-1/2 flex justify-center items-center rounded-l-[120px] overflow-hidden">
          {/* Background utama dengan bayangan lembut */}
          <div className="absolute inset-0 bg-[#4F7F8C] shadow-[0_0_25px_rgba(0,0,0,0.4),0_0_35px_rgba(0,0,0,0.25)]" />

          {/* Konten */}
          <div className="relative z-10 flex flex-col items-center text-center text-white space-y-1">
            <Image
              src="/secondchoice-logo.jpg"
              alt="SecondChoice Logo"
              width={130}
              height={130}
              priority
            />
            <h2 className="text-3xl font-bold mt-1">Hai, Teman!</h2>
            <p className="text-m text-gray-200 max-w-[300px] leading-relaxed">
              Daftar dengan data personal Anda untuk mendapatkan semua fitur
            </p>
            <button className="mt-3 border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-[#4F7F8C] transition">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
