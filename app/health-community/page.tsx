"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function HealthCommunity() {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const result = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(result.toFixed(1)));
    }
  };

  const sprintData = [
    { w: '1', f: 'Endurance Building', i: 'Low', c: 'bg-green-500 text-white' },
    { w: '2', f: 'Strength Training', i: 'Medium', c: 'bg-yellow-500 text-black' },
    { w: '3', f: 'Speed Development', i: 'High', c: 'bg-red-500 text-white' },
    { w: '4', f: 'Recovery & Maintenance', i: 'Low', c: 'bg-blue-500 text-white' },
  ];

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      {/* --- FIXED NAVIGATION BAR --- */}
      <nav className="fixed top-0 w-full py-5 px-10 flex justify-between items-center bg-[#393E46]/80 backdrop-blur-md z-50 border-b border-[#00ADB5]/20">
        <Link href="/" className="text-2xl font-black text-[#EEEEEE] tracking-tighter">
          FIT<span className="text-[#00ADB5]">TRACK</span>
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/features" className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors font-medium text-sm uppercase tracking-wider">Membership</Link>
          <Link href="/blog" className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors font-medium text-sm uppercase tracking-wider">Blog</Link>
          <Link href="/health-community" className="text-[#00ADB5] transition-colors font-bold text-sm uppercase tracking-wider">Health & Community</Link>
          <Link href="/about-us" className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors font-medium text-sm uppercase tracking-wider">About Us</Link>
          <Link href="/login" className="border border-[#00ADB5] text-[#00ADB5] px-6 py-2 rounded-md hover:bg-[#00ADB5] hover:text-[#222831] transition-all font-bold text-sm">LOGIN</Link>
        </div>
      </nav>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* HEADER SECTION */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black border-l-8 border-[#00ADB5] pl-6 uppercase tracking-tighter leading-none">
            Health & <br /><span className="text-[#00ADB5]">Community</span>
          </h1>
        </div>

        {/* TOP GRID: BMI & PROTOCOL */}
        <div className="grid lg:grid-cols-3 gap-10 mb-10">
          
          {/* LEFT: BMI CALCULATOR */}
          <div className="bg-[#393E46] p-8 rounded-2xl shadow-2xl border border-white/5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#00ADB5]">Personal Metrics</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Weight (kg)</label>
                  <input type="number" onChange={(e) => setWeight(Number(e.target.value))} className="w-full bg-[#222831] border border-gray-600 rounded-lg p-4 focus:border-[#00ADB5] outline-none transition" placeholder="70" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Height (cm)</label>
                  <input type="number" onChange={(e) => setHeight(Number(e.target.value))} className="w-full bg-[#222831] border border-gray-600 rounded-lg p-4 focus:border-[#00ADB5] outline-none transition" placeholder="175" />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button onClick={calculateBMI} className="w-full bg-[#00ADB5] text-[#222831] font-black py-4 rounded-lg hover:bg-[#00cedb] transition shadow-[0_0_20px_rgba(0,173,181,0.2)] uppercase">Calculate BMI</button>
              {bmi && (
                <div className="mt-6 p-5 bg-[#222831] rounded-xl text-center border-t-2 border-[#00ADB5] animate-in fade-in zoom-in duration-300">
                  <p className="text-xs uppercase font-bold opacity-40 mb-1">Your Result</p>
                  <p className="text-5xl font-black text-[#00ADB5]">{bmi}</p>
                  <p className="text-sm mt-2 font-bold text-[#EEEEEE]/60 uppercase tracking-widest">
                    {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : "Overweight"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SPRINT TABLE */}
          <div className="lg:col-span-2 bg-[#393E46] p-8 rounded-2xl shadow-2xl border border-white/5">
            <h2 className="text-2xl font-bold mb-8">Weekly Sprint Protocol</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-5 text-[#00ADB5] text-xs uppercase tracking-widest">Week</th>
                    <th className="pb-5 text-xs uppercase tracking-widest">Training Focus</th>
                    <th className="pb-5 text-xs uppercase tracking-widest text-right">Intensity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {sprintData.map((row) => (
                    <tr key={row.w} className="group hover:bg-white/5 transition-colors">
                      <td className="py-5 font-black text-[#00ADB5] text-xl">{row.w}</td>
                      <td className="py-5 font-medium text-lg">{row.f}</td>
                      <td className="py-5 text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${row.c}`}>
                          {row.i}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: NUTRITION & HYDRATION */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-[#393E46] p-8 rounded-2xl border-l-8 border-[#EEEEEE] shadow-xl">
            <h3 className="text-2xl font-black mb-4 text-[#00ADB5] uppercase italic">Recovery Meals</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#00ADB5] rotate-45"></span> Post-Workout: Greek Yogurt + Berries</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#00ADB5] rotate-45"></span> Dinner: Grilled Salmon + Asparagus</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#00ADB5] rotate-45"></span> Snack: Raw Almonds + Apple</li>
            </ul>
          </div>
          <div className="bg-[#393E46] p-8 rounded-2xl border-l-8 border-[#00ADB5] shadow-xl">
            <h3 className="text-2xl font-black mb-4 text-[#00ADB5] uppercase italic">Hydration Strategy</h3>
            <p className="text-[#EEEEEE]/70 leading-relaxed text-lg">
              Daily Baseline: <span className="text-white font-bold underline decoration-[#00ADB5]">3.7L (Men)</span> / <span className="text-white font-bold underline decoration-[#00ADB5]">2.7L (Women)</span>. 
              Add 500ml per 45min of high-intensity sweat.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
            <Link href="/exercises" className="text-[#00ADB5] hover:text-[#00cedb] transition-colors">
              View Recommended Exercises
            </Link>
            <Link href="/nutrition" className="text-[#00ADB5] hover:text-[#00cedb] transition-colors ml-6">
              View Nutrition Tips
            </Link>
            <Link href="/workouts" className="text-[#00ADB5] hover:text-[#00cedb] transition-colors ml-6">
              View Workouts Strategies
            </Link>
        </div>
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
