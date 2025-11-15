"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signInSchema, SignInType } from "@/lib/validation/signIn";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [form, setForm] = useState<SignInType>({
    email: "",
    password: "",
  });

  // State untuk show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = signInSchema.safeParse(form);
    if (!parsed.success) {
      alert(parsed.error.message);
      return;
    }

    try {
      const result = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (result.error) {
        alert(result.error.message);
        return;
      }
      alert("Kamu berhasil login");
      router.push("/loggedIn");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#32515a] via-[#89b4bb] to-white">
      <div className="bg-white w-[850px] h-[500px] rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_25px_rgba(79,127,140,0.5)] flex overflow-hidden">
        {/* Bagian kiri: Form Sign In */}
        <div className="flex flex-col justify-center items-center w-1/2 p-10">
          <h2 className="text-3xl font-extrabold mb-6 text-black">Sign In</h2>

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

          <form className="w-full max-w-xs space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700"
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                onChange={handleChange}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setTimeout(() => setFocusPassword(false), 200)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-[#4F7F8C] text-gray-700 pr-10"
              />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()} // cegah kehilangan fokus
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-3 flex items-center text-gray-500 
                           hover:text-[#4F7F8C] transition-opacity duration-300 ${
                             focusPassword
                               ? "opacity-100"
                               : "opacity-0 pointer-events-none"
                           }`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

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
        <div className="relative w-1/2 flex flex-col justify-center items-center rounded-l-[120px] p-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#4F7F8C] shadow-[0_0_25px_rgba(0,0,0,0.4),0_0_35px_rgba(0,0,0,0.25)]" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-3 text-white">
            <Image
              src="/secondchoice-logo.jpg"
              alt="SecondChoice Logo"
              width={150}
              height={150}
              priority
            />
            <h2 className="text-4xl font-bold mt-2">Hai, Teman!</h2>
            <p className="text-m text-gray-200 max-w-[300px]">
              Daftar dengan data personal Anda untuk mendapatkan semua fitur
            </p>
            <button
              onClick={() => router.push("/signUp")}
              className="mt-4 border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-[#4F7F8C] transition"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
