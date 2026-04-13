"use client";
import React, { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        full_name: name,
        email: email,
        createdAt: new Date().toISOString(),
      });

      router.push("/");
    } catch (err: any) {
      console.log("SIGN UP ERROR:", err);

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#222831] flex flex-col items-center justify-center p-6">
      <Link
        href="/"
        className="mb-10 text-3xl font-black text-[#EEEEEE] tracking-tighter hover:opacity-80 transition-opacity"
      >
        FIT<span className="text-[#00ADB5]">TRACK</span>
      </Link>

      <div
        className="w-full max-w-md bg-[#393E46] p-10 rounded-2xl shadow-2xl border-b-4 border-[#00ADB5] relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(57, 62, 70, 0.9), rgba(57, 62, 70, 0.95)), url('/background.jpg')`,
        }}
      >
        <div className="relative z-10 text-center mb-8">
          <h2 className="text-4xl font-black text-[#EEEEEE] tracking-tight mb-2">
            JOIN THE CLUB
          </h2>
          <p className="text-[#EEEEEE]/60 font-light">
            Start your fitness journey today
          </p>
        </div>

        <div className="relative z-10 space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#00ADB5] uppercase tracking-widest mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#222831] border border-[#EEEEEE]/10 rounded-md py-3 px-4 text-[#EEEEEE] focus:outline-none focus:border-[#00ADB5] transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#00ADB5] uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#222831] border border-[#EEEEEE]/10 rounded-md py-3 px-4 text-[#EEEEEE] focus:outline-none focus:border-[#00ADB5] transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#00ADB5] uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#222831] border border-[#EEEEEE]/10 rounded-md py-3 px-4 text-[#EEEEEE] focus:outline-none focus:border-[#00ADB5] transition-colors"
              placeholder="Min. 8 characters"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
              {error}
            </p>
          )}

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full py-4 bg-[#00ADB5] text-[#222831] font-black text-lg rounded-md hover:bg-[#00cedb] hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(0,173,181,0.2)] mt-4"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </div>

        <div className="relative z-10 mt-8 text-center">
          <p className="text-[#EEEEEE]/60 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#00ADB5] font-bold hover:underline"
            >
              Login
            </Link>
          </p>
          <p className="mt-8 text-[#EEEEEE]/30 text-[10px] uppercase tracking-widest text-center max-w-xs">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
