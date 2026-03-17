import React from "react";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Next.js App!</h1>
      <p className="text-lg mb-8">This is the home page.</p>
      <Link href="/about" className="text-blue-500 hover:underline">
        Go to About Page
      </Link>
    </div>
  );
}
