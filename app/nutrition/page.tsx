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
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nutrition Search</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Search food (e.g. banana, chicken, rice)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-gray-500">Searching...</p>
      ) : searched && results.length === 0 ? (
        <p className="text-gray-500">No results found. Try another food.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {results.map((item: any, index: number) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <p className="font-bold text-lg">
                {item.product_name || "Unknown Product"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {item.brands || "Unknown brand"}
              </p>
              {item.nutriments && (
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <p>🔥 Calories: <span className="font-medium">{Math.round(item.nutriments["energy-kcal_100g"] || 0)} kcal</span></p>
                  <p>🥩 Protein: <span className="font-medium">{Math.round(item.nutriments["proteins_100g"] || 0)}g</span></p>
                  <p>🍞 Carbs: <span className="font-medium">{Math.round(item.nutriments["carbohydrates_100g"] || 0)}g</span></p>
                  <p>🧈 Fat: <span className="font-medium">{Math.round(item.nutriments["fat_100g"] || 0)}g</span></p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}