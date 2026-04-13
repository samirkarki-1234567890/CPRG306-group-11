import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">

      {/* --- MAIN SECTION --- */}
      <main
        className="flex-grow flex flex-col items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.7), rgba(34, 40, 49, 0.9)), url('/background.jpg')`,
        }}
      >
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

      {/* --- FOOTER --- */}
      <footer className="bg-[#1A1F26] border-t border-[#00ADB5]/10 pt-16 pb-8 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="text-3xl font-black text-[#EEEEEE] tracking-tighter">
              FIT<span className="text-[#00ADB5]">TRACK</span>
            </div>
            <p className="text-[#EEEEEE]/50 font-light text-sm max-w-xs">
              123 Iron Avenue, Muscle District
              <br />
              Steel City, SC 56789
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[#00ADB5] font-bold text-xs uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col space-y-2 text-[#EEEEEE]/70 font-medium text-sm">
              <a href="tel:+15551234567" className="hover:text-[#00ADB5] transition-colors">+1 (555) 123-4567</a>
              <a href="mailto:hello@fittrack.com" className="hover:text-[#00ADB5] transition-colors">hello@fittrack.com</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[#00ADB5] font-bold text-xs uppercase tracking-widest">Follow Us</h4>
            <div className="flex space-x-6">
              {['IG', 'TW', 'FB', 'YT'].map(social => (
                <Link key={social} href="#" className="text-[#EEEEEE]/50 hover:text-[#00ADB5] transition-all font-bold text-sm">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-[#EEEEEE]/5">
          <p className="text-[#EEEEEE]/20 text-[10px] uppercase tracking-[0.2em]">
            © 2026 FITTRACK INTERACTIVE • DESIGNED FOR PERFORMANCE
          </p>
        </div>
      </footer>
    </div>
  );
}