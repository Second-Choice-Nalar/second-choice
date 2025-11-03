"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#32515a] via-[#89b4bb] to-white">
      <div className="bg-white w-[850px] h-[500px] rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_25px_rgba(79,127,140,0.5)] flex overflow-hidden">

        {/* Bagian kiri */}
        <div className="relative w-1/2 flex flex-col justify-center items-center rounded-r-[120px] p-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#4F7F8C] shadow-[0_0_25px_rgba(0,0,0,0.4),0_0_35px_rgba(0,0,0,0.25)]" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-3 text-white">
            <Image
              src="/secondchoice-logo.jpg"
              alt="SecondChoice Logo"
              width={150}
              height={150}
              priority
            />
            <h2 className="text-4xl font-bold mt-2">Selamat Datang!</h2>
            <p className="text-m text-gray-200 max-w-[300px]">
              Masukkan detail pribadi Anda untuk menggunakan semua fitur situs
            </p>
            <button
              onClick={() => router.push("/signin")}
              className="mt-4 border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-[#4F7F8C] transition"
            >
              SIGN IN
            </button>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="flex flex-col justify-center items-center w-1/2 p-10">
          <h2 className="text-3xl font-extrabold mb-6 text-black">Sign Up</h2>

          <div className="flex gap-4 mb-4">
            <button className="border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100 transition">
              <Image src="/google.svg" alt="Google" width={24} height={24} />
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-4">
            atau menggunakan email kamu untuk mendaftar
          </p>

          <form
            className="w-full max-w-xs space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (password !== confirmPassword) {
                alert(
                  "Konfirmasi password tidak cocok dengan password yang Anda masukkan! Tolong masukkan kembali password dengan benar"
                );
                return;
              }
              alert("Akun berhasil dibuat!");
            }}
          >
            {/* Nama */}
            <input
              type="nama"
              placeholder="Nama"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700"
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setTimeout(() => setFocusPassword(false), 200)} // 🔹 delay kecil agar tombol bisa diklik
                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700 pr-10"
              />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()} // 🔹 cegah kehilangan fokus saat diklik
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#4F7F8C] transition-opacity duration-300 ${
                  focusPassword ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Konfirmasi Password */}
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusConfirmPassword(true)}
                onBlur={() => setTimeout(() => setFocusConfirmPassword(false), 200)} // 🔹 delay kecil
                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700 pr-10"
              />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()} // 🔹 cegah kehilangan fokus
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className={`absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#4F7F8C] transition-opacity duration-300 ${
                  focusConfirmPassword
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#4F7F8C] text-white py-2 px-8 rounded-md font-medium hover:bg-[#42707d] transition"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
