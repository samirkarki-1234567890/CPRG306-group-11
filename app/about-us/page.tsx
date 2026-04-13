import React from "react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">

      {/* --- ENHANCED HERO SECTION --- */}
      <main
        className="relative py-24 px-6 flex flex-col items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.9), rgba(34, 40, 49, 0.95)), url('https://unsplash.com')`,
        }}
      >
        <div className="max-w-4xl relative z-10">
          <span className="text-[#00ADB5] font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Est. 2022</span>
          <h1 className="text-5xl md:text-8xl font-black text-[#EEEEEE] mb-6 tracking-tighter leading-none">
            WE BUILD <span className="text-[#00ADB5]">TITANS.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#EEEEEE]/70 leading-relaxed font-light max-w-2xl mx-auto mb-8">
            FitTrack was born in a garage gym with a single goal: to replace guesswork with
            <span className="text-[#EEEEEE] font-semibold"> clinical precision.</span>
          </p>
        </div>
      </main>

      {/* --- STATS BAR --- */}
      <div className="bg-[#393E46] py-10 border-y border-[#00ADB5]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {[
            { label: "Active Athletes", value: "250K+" },
            { label: "Workouts Logged", value: "12M+" },
            { label: "Countries", value: "45" },
            { label: "App Rating", value: "4.9/5" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-[#00ADB5] text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-[#EEEEEE]/40 text-xs uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- OUR STORY SECTION --- */}
      <section className="py-24 px-6 bg-[#222831]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-[#EEEEEE] tracking-tight">THE <span className="text-[#00ADB5]">ORIGIN</span></h2>
            <p className="text-[#EEEEEE]/70 leading-relaxed italic border-l-2 border-[#00ADB5] pl-6">
              "Most fitness apps were either too simple for serious athletes or too complex for daily use. We decided to bridge that gap."
            </p>
            <p className="text-[#EEEEEE]/60 leading-relaxed font-light">
              Started by powerlifters and engineers, FitTrack combines biomechanical data with intuitive UI. We don't just track weight; we track velocity, recovery, and metabolic adaptation to help you break plateaus.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 h-[300px]">
            <div className="bg-[#393E46] rounded-xl border border-[#00ADB5]/20 flex items-center justify-center text-[#EEEEEE]/20 font-black text-4xl">01</div>
            <div className="bg-[#393E46] rounded-xl border border-[#00ADB5]/20 flex items-center justify-center text-[#EEEEEE]/20 font-black text-4xl mt-12">02</div>
          </div>
        </div>
      </section>

      {/* --- VALUES GRID --- */}
      <section className="py-24 bg-[#1A1F26]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "HYPER-PRECISION", desc: "Every rep and calorie perfectly accounted for via proprietary algorithms." },
              { title: "OPEN ECOSYSTEM", desc: "Your data is yours. Seamlessly sync with all major wearables and platforms." },
              { title: "RADICAL GROWTH", desc: "Data-driven insights engineered to help you transcend your physical limits." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#222831] p-10 rounded-xl border border-[#EEEEEE]/5 hover:border-[#00ADB5]/50 transition-all group"
              >
                <div className="w-10 h-1 w-12 bg-[#00ADB5] mb-6"></div>
                <h3 className="text-[#EEEEEE] font-black text-xl mb-4 tracking-tighter uppercase">{item.title}</h3>
                <p className="text-[#EEEEEE]/50 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24 px-6 bg-[#222831]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#EEEEEE] mb-16 tracking-widest uppercase">THE SQUAD</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { name: "Samir Karki", role: "CEO" },
              { name: "Sargam Kunwor", role: "Lead Engineer" },
              { name: "Dior Phillips", role: "Director" },
              { name: "Sola Akinbode", role: "Founder" },
            ].map((member, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-[#393E46] rounded-full mx-auto w-32 border-2 border-[#00ADB5]/10 flex items-center justify-center text-[#00ADB5] font-black italic">FT</div>
                <div>
                  <h4 className="text-[#EEEEEE] font-bold text-sm">{member.name}</h4>
                  <p className="text-[#00ADB5] text-[10px] font-bold uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 flex flex-col items-center bg-[#222831]">
        <div className="h-1 w-24 bg-[#00ADB5] mb-12 rounded-full opacity-50"></div>
        <h2 className="text-3xl font-black text-[#EEEEEE] mb-8">STOP GUESSING. START WINNING.</h2>
        <Link
          href="/features"
          className="px-12 py-4 bg-[#00ADB5] text-[#222831] font-black text-lg rounded-md hover:bg-[#00cedb] hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(0,173,181,0.3)]"
        >
          JOIN THE SQUAD
        </Link>
      </section>

      {/* FOOTER */}
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