import React from "react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">
      {/* --- NAVIGATION BAR (Consistent with Home) --- */}
      <nav className="w-full py-5 px-8 flex justify-between items-center bg-[#393E46]/50 backdrop-blur-md sticky top-0 z-50 border-b border-[#00ADB5]/20">
        <div className="text-2xl font-black text-[#EEEEEE] tracking-tighter">
          <Link href="/">FIT<span className="text-[#00ADB5]">TRACK</span></Link>
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

      {/* --- HERO SECTION --- */}
      <main
        className="relative py-20 px-6 flex flex-col items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.85), rgba(34, 40, 49, 0.95)), url('/background.jpg')`,
        }}
      >
        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-[#EEEEEE] mb-6 tracking-tight">
            OUR <span className="text-[#00ADB5]">MISSION</span>
          </h1>
          <p className="text-xl text-[#EEEEEE]/80 leading-relaxed font-light mb-12">
            At <span className="font-bold text-[#00ADB5]">FIT TRACK</span>, we
            believe that elite-level tracking shouldn't be complicated. We build
            tools that empower athletes to master their data and dominate their
            goals.
          </p>

          {/* --- VALUES GRID --- */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "PRECISION",
                desc: "Every rep, every calorie, perfectly accounted for.",
              },
              {
                title: "COMMUNITY",
                desc: "Join thousands of athletes pushing their limits.",
              },
              {
                title: "RESULTS",
                desc: "Data-driven insights to break through plateaus.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#393E46]/60 backdrop-blur-sm p-8 rounded-xl border-l-4 border-[#00ADB5] text-left hover:bg-[#393E46] transition-all"
              >
                <h3 className="text-[#00ADB5] font-black text-xl mb-3 tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-[#EEEEEE]/70 text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- CTA SECTION --- */}
      <section className="py-20 flex flex-col items-center bg-[#222831]">
        <div className="h-1 w-24 bg-[#00ADB5] mb-12 rounded-full opacity-50"></div>
        <h2 className="text-3xl font-black text-[#EEEEEE] mb-8">
          READY TO START?
        </h2>
        <Link
          href="/signup"
          className="px-12 py-4 bg-[#00ADB5] text-[#222831] font-black text-lg rounded-md hover:bg-[#00cedb] hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(0,173,181,0.3)]"
        >
          JOIN THE SQUAD
        </Link>
      </section>

      {/* --- FOOTER --- */}
      {/* --- CONTACT & FOOTER SECTION --- */}
      <footer className="bg-[#1A1F26] border-t border-[#00ADB5]/10 pt-16 pb-8 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 1. BRAND & LOCALE */}
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

          {/* 2. CONTACT INFO */}
          <div className="space-y-4">
            <h4 className="text-[#00ADB5] font-bold text-xs uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex flex-col space-y-2 text-[#EEEEEE]/70 font-medium">
              <a
                href="tel:+15551234567"
                className="hover:text-[#00ADB5] transition-colors"
              >
                +1 (555) 123-4567
              </a>
              <a
                href="mailto:hello@fittrack.com"
                className="hover:text-[#00ADB5] transition-colors"
              >
                hello@fittrack.com
              </a>
            </div>
          </div>

          {/* 3. SOCIALS */}
          <div className="space-y-4">
            <h4 className="text-[#00ADB5] font-bold text-xs uppercase tracking-widest">
              Follow Us
            </h4>
            <div className="flex space-x-6">
              {/* Using simple text links - you can replace with Lucide-react icons later */}
              <Link
                href="#"
                className="text-[#EEEEEE]/50 hover:text-[#00ADB5] transition-all font-bold"
              >
                IG
              </Link>
              <Link
                href="#"
                className="text-[#EEEEEE]/50 hover:text-[#00ADB5] transition-all font-bold"
              >
                TW
              </Link>
              <Link
                href="#"
                className="text-[#EEEEEE]/50 hover:text-[#00ADB5] transition-all font-bold"
              >
                FB
              </Link>
              <Link
                href="#"
                className="text-[#EEEEEE]/50 hover:text-[#00ADB5] transition-all font-bold"
              >
                YT
              </Link>
            </div>
          </div>
        </div>

        {/* COPYRIGHT BAR */}
        <div className="text-center pt-8 border-t border-[#EEEEEE]/5">
          <p className="text-[#EEEEEE]/20 text-[10px] uppercase tracking-[0.2em]">
            © 2026 FITTRACK INTERACTIVE • DESIGNED FOR PERFORMANCE
          </p>
        </div>
      </footer>
    </div>
  );
}
