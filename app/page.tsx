import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">
      {/* --- NAVIGATION BAR --- */}
      <nav className="w-full py-5 px-8 flex justify-between items-center bg-[#393E46]/50 backdrop-blur-md sticky top-0 z-50 border-b border-[#00ADB5]/20">
        <div className="text-2xl font-black text-[#EEEEEE] tracking-tighter">
          FIT<span className="text-[#00ADB5]">TRACK</span>
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/features"
            className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors font-medium"
          >
            Membership
          </Link>
          <Link
            href="/blog"
            className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors font-medium"
          >
            Blog
          </Link>
          <Link
            href="/community"
            className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors font-medium"
          >
            Community
          </Link>
          <Link
            href="/about-us"
            className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors font-medium"
          >
            About Us
          </Link>

          <Link
            href="/login"
            className="border border-[#00ADB5] text-[#00ADB5] px-5 py-2 rounded-md hover:bg-[#00ADB5] hover:text-[#222831] transition-all font-bold"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* --- MAIN SECTION --- */}
      <main
        className="flex-grow flex flex-col items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.7), rgba(34, 40, 49, 0.9)), url('/background.jpg')`,
        }}
      >
        {/* The card now uses a solid or semi-transparent color to stand out from the new page background */}
        <div className="bg-[#393E46]/80 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-3xl border-b-4 border-[#00ADB5]">
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-[#EEEEEE] tracking-tight">
            FIT<span className="text-[#00ADB5]"> TRACK</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 text-[#EEEEEE]/80 font-light max-w-md mx-auto leading-relaxed">
            Level up your training. Track{" "}
            <span className="text-[#00ADB5] font-bold">workouts</span>, manage{" "}
            <span className="text-[#00ADB5] font-bold">nutrition</span>, and
            crush your goals.
          </p>

          <Link
            href="/sign-up"
            className="inline-block px-12 py-4 bg-[#00ADB5] text-[#222831] font-black text-lg rounded-md hover:bg-[#00cedb] hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(0,173,181,0.3)]"
          >
            START YOUR JOURNEY
          </Link>

          <div className="mt-8 flex justify-center gap-4">
            <div className="h-1 w-12 bg-[#00ADB5] rounded-full"></div>
            <div className="h-1 w-4 bg-[#393E46] border border-[#00ADB5] rounded-full"></div>
            <div className="h-1 w-4 bg-[#393E46] border border-[#00ADB5] rounded-full"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
