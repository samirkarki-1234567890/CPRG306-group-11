"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedPlan = searchParams.get("plan") || "PRO";
  const selectedPrice = searchParams.get("price") || "$39";

  const priceNumber = Number(selectedPrice.replace("$", ""));
  const taxRate = 0.05;
  const taxAmount = (priceNumber * taxRate).toFixed(2);
  const totalAmount = (priceNumber + Number(taxAmount)).toFixed(2);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardholderName?: string;
  }>({});

  const handleNameChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setter(value.replace(/[^a-zA-Z\s]/g, ""));
  };

  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  const handleExpiryDateChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setExpiryDate(
      digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits,
    );
  };

  const handleCvvChange = (value: string) => {
    setCvv(value.replace(/\D/g, "").slice(0, 3));
  };

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      cardNumber?: string;
      expiryDate?: string;
      cvv?: string;
      cardholderName?: string;
    } = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card must be 16 digits";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Format MM/YY";
    }

    if (cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    if (!cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      router.push(
        `/payment-success?plan=${encodeURIComponent(
          selectedPlan,
        )}&price=${encodeURIComponent(`$${totalAmount}`)}`,
      );
    }
  };

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
          <div className="bg-[#393E46]/85 rounded-2xl p-8 border-l-4 border-[#00ADB5]">
            <h2 className="text-3xl font-black text-[#00ADB5] mb-6">
              ORDER SUMMARY
            </h2>

            <div className="bg-[#222831]/70 rounded-xl p-6 space-y-5">
              <div className="flex justify-between">
                <span className="text-[#EEEEEE]/70">Plan</span>
                <span className="text-[#EEEEEE]">{selectedPlan}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#EEEEEE]/70">Fee</span>
                <span className="text-[#EEEEEE]">${priceNumber}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#EEEEEE]/70">GST (5%)</span>
                <span className="text-[#EEEEEE]">${taxAmount}</span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="text-[#EEEEEE] font-bold">TOTAL</span>
                <span className="text-[#00ADB5] text-2xl font-black">
                  ${totalAmount}
                </span>
              </div>
            </div>
          </div>

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
                  className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md focus:outline-none focus:border-[#00ADB5]"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md focus:outline-none focus:border-[#00ADB5]"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md focus:outline-none focus:border-[#00ADB5]"
                />
                {errors.cardNumber && (
                  <p className="text-red-400 text-sm mt-1">
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
                    className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md focus:outline-none focus:border-[#00ADB5]"
                  />
                  {errors.expiryDate && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    value={cvv}
                    onChange={(e) => handleCvvChange(e.target.value)}
                    placeholder="CVV"
                    className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md focus:outline-none focus:border-[#00ADB5]"
                  />
                  {errors.cvv && (
                    <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
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
                  className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md focus:outline-none focus:border-[#00ADB5]"
                />
                {errors.cardholderName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              <button className="w-full py-4 bg-[#00ADB5] text-[#222831] font-black rounded-md hover:bg-[#00cedb] transition-all">
                PAY ${totalAmount}
              </button>
            </form>

            <div className="text-center mt-4">
              <Link
                href="/features"
                className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors"
              >
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
