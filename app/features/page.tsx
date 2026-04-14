"use client";

import React, { Suspense } from "react"; // 1. Added Suspense import
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// 2. Move your logic into a sub-component
function MembershipContent() {
  const searchParams = useSearchParams();
  const purchasedPlan = searchParams.get("plan");

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
          <h1 className="text-5xl font-black text-[#EEEEEE] mb-12">
            OUR <span className="text-[#00ADB5]">MEMBERSHIP</span>
          </h1>

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
                  {isOwned && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00ADB5] text-[#222831] px-4 py-2 rounded-full font-black">
                      ✓ ACTIVE
                    </div>
                  )}
                  <h2 className="text-3xl font-black text-[#00ADB5] mb-2 mt-4">
                    {plan.name}
                  </h2>
                  <p className="text-5xl font-black text-[#EEEEEE] mb-4">
                    {plan.price}
                  </p>
                  <p className="text-[#EEEEEE]/70 mb-6">{plan.subtitle}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-[#EEEEEE]/80">
                        ✓ {f}
                      </li>
                    ))}
                  </ul>

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

// 3. The default export now wraps the content in Suspense
export default function MembershipPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#222831] text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <MembershipContent />
    </Suspense>
  );
}
