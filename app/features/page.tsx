import React from "react";
import Link from "next/link";

export default function MembershipPage() {
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
      {/* NAVBAR */}
      <nav className="w-full py-5 px-8 flex justify-between items-center bg-[#393E46]/50 backdrop-blur-md sticky top-0 z-50 border-b border-[#00ADB5]/20">
        <Link href="/" className="text-2xl font-black text-[#EEEEEE] tracking-tighter">
          FIT<span className="text-[#00ADB5]">TRACK</span>
        </Link>

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

      {/* HERO */}
      <main
        className="flex-grow bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34, 40, 49, 0.82), rgba(34, 40, 49, 0.95)), url('/background.jpg')",
        }}
      >
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-6">
            <div className="w-20 h-1 bg-[#00ADB5] mx-auto rounded-full mb-8"></div>
            <h1 className="text-5xl md:text-7xl font-black text-[#EEEEEE] tracking-tight">
              OUR <span className="text-[#00ADB5]">MEMBERSHIP</span>
            </h1>
          </div>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-[#EEEEEE]/80 leading-relaxed mb-16">
            Choose the membership plan that matches your goals. From beginner
            support to elite performance tools,{" "}
            <span className="text-[#00ADB5] font-bold">FIT TRACK</span> helps
            you train smarter and stay consistent.
          </p>

          {/* MEMBERSHIP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-[#393E46]/85 backdrop-blur-sm rounded-2xl p-8 text-left shadow-2xl transition-all hover:-translate-y-2 border-l-4 ${
                  plan.featured
                    ? "border-[#00ADB5] scale-105 shadow-[0_0_25px_rgba(0,173,181,0.25)]"
                    : "border-[#00ADB5]/70"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00ADB5] text-[#222831] text-sm font-black px-4 py-2 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <h2 className="text-3xl font-black text-[#00ADB5] mb-2 mt-4">
                  {plan.name}
                </h2>

                <p className="text-5xl font-black text-[#EEEEEE] mb-4">
                  {plan.price}
                  <span className="text-lg font-medium text-[#EEEEEE]/60">
                    /mo
                  </span>
                </p>

                <p className="text-[#EEEEEE]/75 mb-6 leading-relaxed">
                  {plan.subtitle}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-[#EEEEEE]/85 flex items-start gap-3"
                    >
                      <span className="text-[#00ADB5] font-black">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  className={`block text-center w-full py-3 rounded-md font-black transition-all ${
                    plan.featured
                      ? "bg-[#00ADB5] text-[#222831] hover:bg-[#00cedb]"
                      : "border border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5] hover:text-[#222831]"
                  }`}
                >
                  JOIN NOW
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="max-w-4xl mx-auto px-6 pb-20 pt-6 text-center">
          <div className="w-24 h-1 bg-[#00ADB5] mx-auto rounded-full mb-8"></div>
          <h2 className="text-4xl md:text-5xl font-black text-[#EEEEEE] mb-6">
            READY TO LEVEL UP?
          </h2>
          <p className="text-[#EEEEEE]/75 text-lg max-w-2xl mx-auto mb-10">
            Join FIT TRACK today and unlock the tools, insights, and support
            you need to reach your next goal.
          </p>

          <Link
            href="/sign-up"
            className="inline-block px-12 py-4 bg-[#00ADB5] text-[#222831] font-black text-lg rounded-md hover:bg-[#00cedb] hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(0,173,181,0.3)]"
          >
            START MEMBERSHIP
          </Link>
        </section>
      </main>
    </div>
  );
}