"use client";
import { useState } from "react";
import Link from "next/link";

export default function NutritionPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setSearched(true);
    const res = await fetch(`/api/nutrition?query=${query}`);
    const data = await res.json();
    setResults(data.products || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#0f172a] text-white">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-6 flex justify-between items-center">
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-200 shadow-sm">
            ← Back to Home
          </button>
        </Link>

        <span className="text-sm text-gray-400 hidden md:block">
          FitTrack Nutrition Search
        </span>
      </div>

      <section className="relative overflow-hidden border-b border-cyan-500/20 mt-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.08),_transparent_30%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto rounded-[2rem] border border-cyan-400/30 bg-white/10 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.12)] px-8 py-12 md:px-14 md:py-14">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-center">
              <span className="text-white">NUTRITION </span>
              <span className="text-cyan-400">SEARCH</span>
            </h1>

            <p className="mt-6 text-center text-lg md:text-2xl text-gray-300 leading-relaxed">
              Search foods, check{" "}
              <span className="text-cyan-400 font-semibold">calories</span>,
              compare{" "}
              <span className="text-cyan-400 font-semibold">macros</span>, and
              make better nutrition choices.
            </p>

            <div className="mt-10 flex justify-center">
              <div className="h-1 w-20 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      <div className="p-8 max-w-2xl mx-auto">
        <div className="rounded-[1.5rem] border border-cyan-400/20 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg">
          {/* Search Bar */}
          <div className="flex gap-2 mb-6">
            <input
              className="flex-1 rounded-xl border border-cyan-400/20 bg-slate-800/80 text-white placeholder:text-gray-400 p-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              placeholder="Search food (e.g. banana, chicken, rice)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-cyan-400 text-slate-900 px-6 py-2 rounded-xl font-semibold hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_18px_rgba(34,211,238,0.2)]"
            >
              Search
            </button>
          </div>

          {/* Results */}
          {loading ? (
            <p className="text-gray-300">Searching...</p>
          ) : searched && results.length === 0 ? (
            <p className="text-gray-400">No results found. Try another food.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {results.map((item: any, index: number) => (
                <div
                  key={index}
                  className="rounded-2xl border border-cyan-400/20 bg-[#1f2937]/80 p-4 shadow-md hover:shadow-[0_0_18px_rgba(6,182,212,0.15)] transition"
                >
                  <p className="font-bold text-lg text-cyan-400">
                    {item.product_name || "Unknown Product"}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    {item.brands || "Unknown brand"}
                  </p>

                  {item.nutriments && (
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-200">
                      <p>
                        🔥 Calories:{" "}
                        <span className="font-medium">
                          {Math.round(item.nutriments["energy-kcal_100g"] || 0)}{" "}
                          kcal
                        </span>
                      </p>
                      <p>
                        🥩 Protein:{" "}
                        <span className="font-medium">
                          {Math.round(item.nutriments["proteins_100g"] || 0)}g
                        </span>
                      </p>
                      <p>
                        🍞 Carbs:{" "}
                        <span className="font-medium">
                          {Math.round(
                            item.nutriments["carbohydrates_100g"] || 0,
                          )}
                          g
                        </span>
                      </p>
                      <p>
                        🧈 Fat:{" "}
                        <span className="font-medium">
                          {Math.round(item.nutriments["fat_100g"] || 0)}g
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
