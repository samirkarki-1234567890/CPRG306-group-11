"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MembershipPage() {
  // get selected plan from URL
  const searchParams = useSearchParams();
  const purchasedPlan = searchParams.get("plan");

  // membership plans data
  const plans = [
    {
      name: "STARTER",
      price: "$19",
      subtitle: "For beginners starting their fitness journey.",
      features: [
        "Workout tracking",
        "Nutrition logging",
        "Weekly progress reports",
        "Basic community access",
      ],
      featured: false,
    },
    {
      name: "PRO",
      price: "$39",
      subtitle: "For committed athletes who want deeper insights.",
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Custom training plans",
        "Priority support",
      ],
      featured: true,
    },
    {
      name: "ELITE",
      price: "$59",
      subtitle: "For top performers chasing elite-level results.",
      features: [
        "Everything in Pro",
        "Personalized coaching tools",
        "Full performance dashboard",
        "Exclusive elite challenges",
      ],
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">
      <main
        className="flex-grow bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,40,49,0.82), rgba(34,40,49,0.95)), url('/background.jpg')",
        }}
      >
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">

          {/* heading */}
          <h1 className="text-5xl font-black text-[#EEEEEE] mb-12">
            OUR <span className="text-[#00ADB5]">MEMBERSHIP</span>
          </h1>

          {/* plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const isOwned = purchasedPlan === plan.name;
              const isLocked = purchasedPlan && !isOwned;

              return (
                <div
                  key={index}
                  className={`relative bg-[#393E46]/85 rounded-2xl p-8 text-left border-l-4 transition-all ${
                    isOwned
                      ? "border-[#00ADB5] scale-105 shadow-[0_0_30px_rgba(0,173,181,0.4)]"
                      : isLocked
                      ? "opacity-40 grayscale"
                      : "border-[#00ADB5]/70 hover:-translate-y-2"
                  }`}
                >

                  {/* active badge */}
                  {isOwned && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00ADB5] text-[#222831] px-4 py-2 rounded-full font-black">
                      ✓ ACTIVE
                    </div>
                  )}

                  {/* plan name */}
                  <h2 className="text-3xl font-black text-[#00ADB5] mb-2 mt-4">
                    {plan.name}
                  </h2>

                  {/* price */}
                  <p className="text-5xl font-black text-[#EEEEEE] mb-4">
                    {plan.price}
                  </p>

                  {/* subtitle */}
                  <p className="text-[#EEEEEE]/70 mb-6">
                    {plan.subtitle}
                  </p>

                  {/* features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-[#EEEEEE]/80">
                        ✓ {f}
                      </li>
                    ))}
                  </ul>

                  {/* button logic */}
                  {isOwned ? (
                    <div className="w-full py-3 bg-[#00ADB5] text-[#222831] text-center font-black rounded-md">
                      ACTIVE
                    </div>
                  ) : isLocked ? (
                    <div className="w-full py-3 border text-center rounded-md text-[#EEEEEE]/40">
                      UNAVAILABLE
                    </div>
                  ) : (
                    <Link
                      href={`/payment?plan=${plan.name}&price=${plan.price}`}
                      className="block w-full py-3 text-center rounded-md font-black bg-[#00ADB5] text-[#222831]"
                    >
                      JOIN NOW
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

        </section>
      </main>
    </div>
  );
}