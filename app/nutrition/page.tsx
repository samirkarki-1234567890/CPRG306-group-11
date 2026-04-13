"use client";
import { useState } from "react";

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
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-black mb-2">
          NUTRI<span className="text-[#00ADB5]">TION</span>
        </h1>
        <p className="text-[#EEEEEE]/50 mb-8">Search any food to see its macros and calories.</p>

        {/* Search Bar */}
        <div className="flex gap-2 mb-8">
          <input
            className="bg-[#393E46] border border-[#00ADB5]/30 text-[#EEEEEE] p-3 rounded-lg flex-1 placeholder-[#EEEEEE]/30 focus:outline-none focus:border-[#00ADB5]"
            placeholder="Search food (e.g. banana, chicken, rice)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-[#00ADB5] text-[#222831] font-black px-6 py-3 rounded-lg hover:bg-[#00cedb] transition-all"
          >
            Search
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#00ADB5] font-bold animate-pulse">Searching...</p>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="bg-[#393E46] border border-[#00ADB5]/20 rounded-xl p-8 text-center">
            <p className="text-[#EEEEEE]/40">No results found. Try another food.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((item: any, index: number) => (
              <div key={index} className="bg-[#393E46] border border-[#00ADB5]/20 p-4 rounded-xl">
                <p className="font-bold text-lg text-[#EEEEEE]">
                  {item.product_name || "Unknown Product"}
                </p>
                <p className="text-[#00ADB5] text-sm mb-3">
                  {item.brands || "Unknown brand"}
                </p>
                {item.nutriments && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-[#222831] rounded-lg p-2 text-center">
                      <p className="text-[#EEEEEE]/40 text-xs">Calories</p>
                      <p className="font-bold text-[#00ADB5]">{Math.round(item.nutriments["energy-kcal_100g"] || 0)} kcal</p>
                    </div>
                    <div className="bg-[#222831] rounded-lg p-2 text-center">
                      <p className="text-[#EEEEEE]/40 text-xs">Protein</p>
                      <p className="font-bold text-[#00ADB5]">{Math.round(item.nutriments["proteins_100g"] || 0)}g</p>
                    </div>
                    <div className="bg-[#222831] rounded-lg p-2 text-center">
                      <p className="text-[#EEEEEE]/40 text-xs">Carbs</p>
                      <p className="font-bold text-[#00ADB5]">{Math.round(item.nutriments["carbohydrates_100g"] || 0)}g</p>
                    </div>
                    <div className="bg-[#222831] rounded-lg p-2 text-center">
                      <p className="text-[#EEEEEE]/40 text-xs">Fat</p>
                      <p className="font-bold text-[#00ADB5]">{Math.round(item.nutriments["fat_100g"] || 0)}g</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}