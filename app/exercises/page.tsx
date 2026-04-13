"use client";
import { useState } from "react";

const categories = [
  { id: "10", name: "Abs" },
  { id: "11", name: "Arms" },
  { id: "12", name: "Back" },
  { id: "13", name: "Calves" },
  { id: "14", name: "Chest" },
  { id: "15", name: "Legs" },
  { id: "16", name: "Shoulders" },
];

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const fetchExercises = async (categoryId: string, categoryName: string) => {
    setLoading(true);
    setSelected(categoryName);
    const res = await fetch(`/api/exercises?category=${categoryId}`);
    const data = await res.json();

    const detailedExercises = await Promise.all(
      (data.results || []).map(async (ex: any) => {
        const infoRes = await fetch(
          `https://wger.de/api/v2/exerciseinfo/${ex.id}/?format=json`
        );
        const info = await infoRes.json();
        const translation = info.translations?.find((t: any) => t.language === 2);
        return {
          id: ex.id,
          name: translation?.name || `Exercise ${ex.id}`,
          description: translation?.description || "",
        };
      })
    );
    setExercises(detailedExercises as any);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-black mb-2">
          EXERCISE <span className="text-[#00ADB5]">LIBRARY</span>
        </h1>
        <p className="text-[#EEEEEE]/50 mb-8">Browse exercises by muscle group.</p>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => fetchExercises(cat.id, cat.name)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                selected === cat.name
                  ? "bg-[#00ADB5] text-[#222831]"
                  : "bg-[#393E46] text-[#EEEEEE] hover:bg-[#00ADB5] hover:text-[#222831] border border-[#00ADB5]/20"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Exercise List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#00ADB5] font-bold animate-pulse">Loading exercises...</p>
          </div>
        ) : exercises.length === 0 ? (
          <div className="bg-[#393E46] border border-[#00ADB5]/20 rounded-xl p-8 text-center">
            <p className="text-[#EEEEEE]/40">Select a category to see exercises.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {exercises.map((ex: any) => (
              <div key={ex.id} className="bg-[#393E46] border border-[#00ADB5]/20 p-4 rounded-xl">
                <p className="font-bold text-lg text-[#EEEEEE]">{ex.name}</p>
                {ex.description ? (
                  <p
                    className="text-sm text-[#EEEEEE]/50 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: ex.description.slice(0, 200) + "...",
                    }}
                  />
                ) : (
                  <p className="text-sm text-[#EEEEEE]/30 mt-1">No description available.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}