"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const selectedPlan = searchParams.get("plan") || "PRO";
  const selectedPrice = searchParams.get("price") || "$39";

  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">
      <main
        className="flex-grow flex items-center justify-center px-6 py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34, 40, 49, 0.86), rgba(34, 40, 49, 0.96)), url('/background.jpg')",
        }}
      >
        <div className="max-w-2xl w-full bg-[#393E46]/90 backdrop-blur-sm rounded-2xl p-10 shadow-2xl border-l-4 border-[#00ADB5] text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#00ADB5]/15 border border-[#00ADB5]/30 flex items-center justify-center mb-8">
            <span className="text-[#00ADB5] text-5xl font-black">✓</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#EEEEEE] mb-4">
            PAYMENT <span className="text-[#00ADB5]">SUCCESSFUL</span>
          </h1>

          <p className="text-[#EEEEEE]/80 text-lg leading-relaxed mb-8">
            Your membership payment has been completed successfully.
          </p>

          <div className="bg-[#222831]/70 rounded-xl p-6 border border-[#00ADB5]/20 text-left space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-[#EEEEEE]/70">Selected Plan</span>
              <span className="text-[#EEEEEE] font-bold">{selectedPlan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#EEEEEE]/70">Billing</span>
              <span className="text-[#EEEEEE] font-bold">Monthly</span>
            </div>
            <div className="flex justify-between items-center border-t border-[#EEEEEE]/10 pt-4">
              <span className="text-[#EEEEEE] font-black text-lg">
                Amount Paid
              </span>
              <span className="text-[#00ADB5] font-black text-2xl">
                {selectedPrice}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-[#00ADB5] text-[#222831] font-black rounded-md hover:bg-[#00cedb] transition-all"
            >
              GO TO HOME
            </Link>
            <Link
              href="/features"
              className="px-8 py-4 border border-[#00ADB5] text-[#00ADB5] font-black rounded-md hover:bg-[#00ADB5] hover:text-[#222831] transition-all"
            >
              VIEW MEMBERSHIP
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#1A1F26] border-t border-[#00ADB5]/10 pt-16 pb-8 px-8">
        <div className="max-w-6xl mx-auto text-center pt-8 border-t border-[#EEEEEE]/5">
          <p className="text-[#EEEEEE]/20 text-[10px] uppercase tracking-[0.2em]">
            © 2026 FITTRACK INTERACTIVE • DESIGNED FOR PERFORMANCE
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#222831]" />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
