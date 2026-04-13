"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
      console.log("Navbar auth user:", currentUser?.email || "no user");
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <nav className="bg-[#2b3440] px-6 py-4 flex justify-between items-center border-b border-[#00ADB5]/20">
      <Link href="/" className="text-2xl font-black text-white">
        FIT<span className="text-[#00ADB5]">TRACK</span>
      </Link>

      <div className="flex items-center gap-6 text-gray-300">
        <Link href="/features">Membership</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/workouts">Workouts</Link>
        <Link href="/exercises">Exercises</Link>
        <Link href="/nutrition">Nutrition</Link>
        <Link href="/health-community">Community</Link>
        <Link href="/about-us">About Us</Link>

        {checkingAuth ? (
          <button className="border border-cyan-400 text-cyan-400 px-5 py-1.5 rounded-lg opacity-70">
            Loading...
          </button>
        ) : user ? (
          <button
            onClick={handleLogout}
            className="border border-cyan-400 text-cyan-400 px-5 py-1.5 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="border border-cyan-400 text-cyan-400 px-5 py-1.5 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
