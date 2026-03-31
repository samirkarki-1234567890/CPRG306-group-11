import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#222831] flex flex-col items-center justify-center p-6">
      {/* --- LOGO / BACK HOME --- */}
      <Link href="/" className="mb-10 text-3xl font-black text-[#EEEEEE] tracking-tighter hover:opacity-80 transition-opacity">
        FIT<span className="text-[#00ADB5]">TRACK</span>
      </Link>

      {/* --- LOGIN CARD --- */}
      <div 
        className="w-full max-w-md bg-[#393E46] p-10 rounded-2xl shadow-2xl border-b-4 border-[#00ADB5] relative overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(57, 62, 70, 0.9), rgba(57, 62, 70, 0.95)), url('/background.jpg')` 
        }}
      >
        <div className="relative z-10 text-center mb-8">
          <h2 className="text-4xl font-black text-[#EEEEEE] tracking-tight mb-2">WELCOME BACK</h2>
          <p className="text-[#EEEEEE]/60 font-light">Enter your credentials to continue</p>
        </div>

        <form className="relative z-10 space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#00ADB5] uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-[#222831] border border-[#EEEEEE]/10 rounded-md py-3 px-4 text-[#EEEEEE] focus:outline-none focus:border-[#00ADB5] transition-colors"
              placeholder="name@mail.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#00ADB5] uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#222831] border border-[#EEEEEE]/10 rounded-md py-3 px-4 text-[#EEEEEE] focus:outline-none focus:border-[#00ADB5] transition-colors"
              placeholder="Abcdef@123"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#00ADB5] text-[#222831] font-black text-lg rounded-md hover:bg-[#00cedb] hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(0,173,181,0.2)] mt-4"
          >
            LOGIN
          </button>
        </form>

        <div className="relative z-10 mt-8 text-center">
          <p className="text-[#EEEEEE]/60 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#00ADB5] font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Footer link */}
      <Link href="/" className="mt-8 text-[#EEEEEE]/40 text-sm hover:text-[#EEEEEE] transition-colors">
        ← Back to home
      </Link>
    </div>
  );
}
