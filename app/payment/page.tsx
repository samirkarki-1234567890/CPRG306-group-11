"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // get selected plan and price from URL
  const selectedPlan = searchParams.get("plan") || "PRO";
  const rawPrice = searchParams.get("price") || "$39";
  const selectedPrice = rawPrice.startsWith("$") ? rawPrice : `$${rawPrice}`;

  // calculate tax and total
  const priceNumber = Number(selectedPrice.replace("$", ""));
  const taxRate = 0.05;
  const taxAmount = (priceNumber * taxRate).toFixed(2);
  const totalAmount = (priceNumber + Number(taxAmount)).toFixed(2);

  // form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [errors, setErrors] = useState<any>({});

  // allow only letters and spaces for name fields
  const handleNameChange = (value: string, setter: any) => {
    setter(value.replace(/[^a-zA-Z\s]/g, ""));
  };

  // format card number in groups of 4
  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  // format expiry date as MM/YY
  const handleExpiryDateChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setExpiryDate(
      digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
    );
  };

  // allow only 3 digits for CVV
  const handleCvvChange = (value: string) => {
    setCvv(value.replace(/\D/g, "").slice(0, 3));
  };

  // check form before payment
  const validateForm = () => {
    const newErrors: any = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Valid email is required";
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "16 digits required";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "MM/YY format required";
    }

    if (cvv.length !== 3) newErrors.cvv = "3 digits required";

    if (!cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // go to success page after payment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const params = new URLSearchParams({
        plan: selectedPlan,
        price: String(priceNumber),
        tax: taxAmount,
        total: totalAmount,
      });

      router.push(`/payment-success?${params.toString()}`);
    }
  };

  // input style
  const inputClass = (field: string) =>
    `w-full p-3 rounded-xl bg-[#1E252C] text-[#EEEEEE] border ${
      errors[field] ? "border-red-500" : "border-[#00ADB5]/15"
    } focus:outline-none focus:border-[#00ADB5] focus:ring-1 focus:ring-[#00ADB5]/40 placeholder:text-[#EEEEEE]/40`;

  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">
      <main
        className="flex-grow bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,40,49,0.85), rgba(34,40,49,0.95)), url('/background.jpg')",
        }}
      >
        <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* order summary */}
          <div className="bg-[#393E46]/85 rounded-2xl p-8 border-l-4 border-[#00ADB5]">
            <h2 className="text-3xl font-black text-[#00ADB5] mb-6">
              ORDER SUMMARY
            </h2>

            <div className="bg-[#1E252C] rounded-2xl p-6 space-y-5 border border-[#00ADB5]/15 shadow-inner">
              <div className="flex justify-between text-[#EEEEEE]/80">
                <span>Plan</span>
                <span className="font-semibold text-[#EEEEEE]">
                  {selectedPlan}
                </span>
              </div>

              <div className="flex justify-between text-[#EEEEEE]/80">
                <span>Fee</span>
                <span className="text-[#EEEEEE]">${priceNumber}</span>
              </div>

              <div className="flex justify-between text-[#EEEEEE]/80">
                <span>GST (5%)</span>
                <span className="text-[#EEEEEE]">${taxAmount}</span>
              </div>

              <div className="border-t border-[#EEEEEE]/10 pt-4 flex justify-between items-center">
                <span className="font-bold text-[#EEEEEE]">TOTAL</span>
                <span className="text-[#00ADB5] text-2xl font-black">
                  ${totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* payment form */}
          <div className="bg-[#393E46]/85 rounded-2xl p-8 border-l-4 border-[#00ADB5]/70">
            <h2 className="text-3xl font-black text-[#00ADB5] mb-6">
              PAYMENT DETAILS
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  value={fullName}
                  onChange={(e) =>
                    handleNameChange(e.target.value, setFullName)
                  }
                  placeholder="Full Name"
                  className={inputClass("fullName")}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="Card Number"
                  className={inputClass("cardNumber")}
                />
                {errors.cardNumber && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    value={expiryDate}
                    onChange={(e) => handleExpiryDateChange(e.target.value)}
                    placeholder="MM/YY"
                    className={inputClass("expiryDate")}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    value={cvv}
                    onChange={(e) => handleCvvChange(e.target.value)}
                    placeholder="CVV"
                    className={inputClass("cvv")}
                  />
                  {errors.cvv && (
                    <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  value={cardholderName}
                  onChange={(e) =>
                    handleNameChange(e.target.value, setCardholderName)
                  }
                  placeholder="Cardholder Name"
                  className={inputClass("cardholderName")}
                />
                {errors.cardholderName && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#00ADB5] text-black font-black rounded-xl hover:bg-[#00c8d2] transition-all hover:-translate-y-1 shadow-[0_0_15px_rgba(0,173,181,0.3)]"
              >
                PAY ${totalAmount}
              </button>
            </form>

            {/* back button */}
            <div className="text-center mt-4">
              <Link href="/features" className="text-[#00ADB5] hover:underline">
                ← Back
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#222831]" />}>
      <PaymentContent />
    </Suspense>
  );
}