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

    // Fetch exercise names from wger
    const detailedExercises = await Promise.all(
      (data.results || []).map(async (ex: any) => {
        const infoRes = await fetch(
          `https://wger.de/api/v2/exerciseinfo/${ex.id}/?format=json`
        );
        const info = await infoRes.json();
        const translation = info.translations?.find(
          (t: any) => t.language === 2
        );
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
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exercise Library</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => fetchExercises(cat.id, cat.name)}
            className={`px-4 py-2 rounded text-white ${
              selected === cat.name ? "bg-green-800" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      {loading ? (
        <p className="text-gray-500">Loading exercises...</p>
      ) : exercises.length === 0 ? (
        <p className="text-gray-500">Select a category to see exercises.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {exercises.map((ex: any) => (
            <div key={ex.id} className="border p-4 rounded shadow-sm">
              <p className="font-bold text-lg">{ex.name}</p>
              {ex.description ? (
                <p
                  className="text-sm text-gray-600 mt-1"
                  dangerouslySetInnerHTML={{
                    __html: ex.description.slice(0, 200) + "...",
                  }}
                />
              ) : (
                <p className="text-sm text-gray-400">No description available.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}