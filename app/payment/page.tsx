"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ===== GET PLAN FROM URL =====
  const selectedPlan = searchParams.get("plan") || "PRO";
  const selectedPrice = searchParams.get("price") || "$39";

  // ===== PRICE + TAX CALCULATION =====
  const priceNumber = Number(selectedPrice.replace("$", ""));
  const taxRate = 0.05; // 5% GST
  const taxAmount = (priceNumber * taxRate).toFixed(2);
  const totalAmount = (priceNumber + Number(taxAmount)).toFixed(2);

  // ===== FORM STATE =====
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  // ===== ERROR STATE =====
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardholderName?: string;
  }>({});

  // ===== INPUT FORMATTING FUNCTIONS =====

  // Only allow letters for names
  const handleNameChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value.replace(/[^a-zA-Z\s]/g, ""));
  };

  // Format card number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  // Format expiry date (MM/YY)
  const handleExpiryDateChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setExpiryDate(
      digits.length > 2
        ? `${digits.slice(0, 2)}/${digits.slice(2)}`
        : digits
    );
  };

  // Only 3 digit CVV
  const handleCvvChange = (value: string) => {
    setCvv(value.replace(/\D/g, "").slice(0, 3));
  };

  // ===== VALIDATION LOGIC =====
  const validateForm = () => {
    const newErrors: any = {};

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

    // return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // ===== FORM SUBMIT =====
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // Redirect to success page with final price
      router.push(
        `/payment-success?plan=${encodeURIComponent(
          selectedPlan
        )}&price=${encodeURIComponent(`$${totalAmount}`)}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#222831] flex flex-col">
      {/* ===== NAVBAR ===== */}
      <nav className="w-full py-5 px-8 flex justify-between items-center bg-[#393E46]/50 backdrop-blur-md border-b border-[#00ADB5]/20">
        <Link href="/" className="text-2xl font-black text-[#EEEEEE]">
          FIT<span className="text-[#00ADB5]">TRACK</span>
        </Link>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main
        className="flex-grow bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,40,49,0.85), rgba(34,40,49,0.95)), url('/background.jpg')",
        }}
      >
        <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ===== ORDER SUMMARY ===== */}
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

          {/* ===== PAYMENT FORM ===== */}
          <div className="bg-[#393E46]/85 rounded-2xl p-8 border-l-4 border-[#00ADB5]/70">
            <h2 className="text-3xl font-black text-[#00ADB5] mb-6">
              PAYMENT DETAILS
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                value={fullName}
                onChange={(e) => handleNameChange(e.target.value, setFullName)}
                placeholder="Full Name"
                className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md"
              />
              {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

              <input
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md"
              />
              {errors.cardNumber && <p className="text-red-400 text-sm">{errors.cardNumber}</p>}

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={expiryDate}
                  onChange={(e) => handleExpiryDateChange(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md"
                />
                <input
                  value={cvv}
                  onChange={(e) => handleCvvChange(e.target.value)}
                  placeholder="CVV"
                  className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md"
                />
              </div>

              {errors.expiryDate && <p className="text-red-400 text-sm">{errors.expiryDate}</p>}
              {errors.cvv && <p className="text-red-400 text-sm">{errors.cvv}</p>}

              <input
                value={cardholderName}
                onChange={(e) =>
                  handleNameChange(e.target.value, setCardholderName)
                }
                placeholder="Cardholder Name"
                className="w-full bg-[#222831]/80 border border-[#EEEEEE]/15 px-4 py-3 text-[#EEEEEE] rounded-md"
              />
              {errors.cardholderName && (
                <p className="text-red-400 text-sm">{errors.cardholderName}</p>
              )}

              <button className="w-full py-4 bg-[#00ADB5] text-[#222831] font-black rounded-md">
                PAY ${totalAmount}
              </button>
            </form>

            <div className="text-center mt-4">
              <Link href="/features" className="text-[#EEEEEE]/70">
                ← Back
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}