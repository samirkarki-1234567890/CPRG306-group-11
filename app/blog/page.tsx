import React from "react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">
      {/* --- NAVIGATION BAR --- */}
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
            href="/health-community"
            className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors font-medium"
          >
            Health & Community
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

      {/* --- HERO / BLOG SECTION --- */}
      <main className="p-8 md:p-20">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#EEEEEE] tracking-tight mb-4">
            LATEST <span className="text-[#00ADB5]">INSIGHTS</span>
          </h1>
          <p className="text-[#EEEEEE]/50 max-w-xl font-light">
            Expert advice on nutrition, recovery, and hitting your personal
            bests.
          </p>
        </header>

        {/* BLOG GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="group cursor-pointer bg-[#393E46] rounded-2xl overflow-hidden border-b-4 border-transparent hover:border-[#00ADB5] transition-all"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src={`/blog-img${i}.jpg`}
                  alt={`Blog post ${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <span className="text-[#00ADB5] text-xs font-black tracking-widest uppercase">
                  Nutrition • 5 Min Read
                </span>
                <h3 className="text-2xl font-black text-[#EEEEEE] mt-2 mb-4 group-hover:text-[#00ADB5] transition-colors">
                  How to Optimize Your Pre-Workout Meal
                </h3>
                <p className="text-[#EEEEEE]/60 font-light leading-relaxed">
                  Discover the science behind fueling your body for maximum
                  explosive power and endurance...
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- IMAGE GALLERY SECTION --- */}
        <section className="mb-24">
          <h2 className="text-3xl font-black text-[#EEEEEE] mb-8 tracking-tighter italic uppercase underline decoration-[#00ADB5] decoration-4 underline-offset-8">
            Inside the Lab
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-[#393E46] rounded-lg overflow-hidden border border-[#EEEEEE]/5 hover:border-[#00ADB5]/50 transition-colors"
              >
                <img
                  src={`/blog-img${i}.jpg`}
                  alt={`Gym gallery ${i}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* --- REVIEWS SECTION --- */}
        <section>
          <h2 className="text-3xl font-black text-[#EEEEEE] mb-8 tracking-tighter text-right">
            ATHLETE <span className="text-[#00ADB5]">FEEDBACK</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex R.",
                text: "FitTrack changed how I view progress. The data doesn't lie.",
              },
              {
                name: "Sarah J.",
                text: "The community here is unmatched. Best gym environment in the city.",
              },
              {
                name: "Mike D.",
                text: "Clean equipment, elite coaches, and the tracking app is flawless.",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-[#393E46] p-8 rounded-2xl relative shadow-xl"
              >
                <div className="text-[#00ADB5] text-4xl font-serif absolute top-4 left-4 opacity-20">
                  “
                </div>
                <p className="text-[#EEEEEE]/80 italic font-light mb-6 relative z-10">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-8 bg-[#00ADB5]"></div>
                  <span className="text-[#EEEEEE] font-black text-sm uppercase tracking-widest">
                    {review.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER (Original Styling Maintained) --- */}
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
            <h4 className="text-[#00ADB5] font-bold text-xs uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex flex-col space-y-2 text-[#EEEEEE]/70 font-medium text-sm">
              <a href="tel:+15551234567" className="hover:text-[#00ADB5] transition-colors">+1 (555) 123-4567</a>
              <a href="mailto:hello@fittrack.com" className="hover:text-[#00ADB5] transition-colors">hello@fittrack.com</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[#00ADB5] font-bold text-xs uppercase tracking-widest">
              Follow Us
            </h4>
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
