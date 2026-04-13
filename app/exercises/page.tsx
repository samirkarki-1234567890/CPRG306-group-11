"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "10", name: "Abs" },
  { id: "11", name: "Arms" },
  { id: "12", name: "Back" },
  { id: "13", name: "Calves" },
  { id: "14", name: "Chest" },
  { id: "15", name: "Legs" },
  { id: "16", name: "Shoulders" },
];

type Exercise = {
  id: number;
  name: string;
  description: string;
};

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const fetchExercises = async (categoryId: string, categoryName: string) => {
    try {
      setLoading(true);
      setSelected(categoryName);

      const res = await fetch(`/api/exercises?category=${categoryId}`);
      const data = await res.json();

      const detailedExercises = await Promise.all(
        (data.results || []).map(async (ex: any) => {
          const infoRes = await fetch(
            `https://wger.de/api/v2/exerciseinfo/${ex.id}/?format=json`,
          );
          const info = await infoRes.json();

          const translation = info.translations?.find(
            (t: any) => t.language === 2,
          );

          return {
            id: ex.id,
            name: translation?.name || `Exercise ${ex.id}`,
            description: translation?.description || "",
          };
        }),
      );

      setExercises(detailedExercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setExercises([]);
    } finally {
      setLoading(false);
    }
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
          FitTrack Exercise Library
        </span>
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.08),_transparent_30%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto rounded-[2rem] border border-cyan-400/30 bg-white/10 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.12)] px-8 py-12 md:px-14 md:py-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-center">
              <span className="text-white">EXERCISE </span>
              <span className="text-cyan-400">LIBRARY</span>
            </h1>

            <p className="mt-6 text-center text-lg md:text-2xl text-gray-300 leading-relaxed">
              Explore targeted{" "}
              <span className="text-cyan-400 font-semibold">workouts</span>,
              build better{" "}
              <span className="text-cyan-400 font-semibold">strength</span>, and
              stay on track with your goals.
            </p>

            <div className="mt-10 flex justify-center">
              <div className="h-1 w-20 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-[1.5rem] border border-cyan-400/20 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Choose a <span className="text-cyan-400">Muscle Group</span>
          </h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => fetchExercises(cat.id, cat.name)}
                className={`px-5 py-2.5 rounded-xl border font-semibold transition-all duration-200 ${
                  selected === cat.name
                    ? "bg-cyan-400 text-slate-900 border-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                    : "bg-slate-800/80 text-white border-cyan-400/20 hover:bg-cyan-500 hover:text-slate-900 hover:border-cyan-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise List */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-[1.5rem] border border-cyan-400/20 bg-white/5 backdrop-blur-sm p-6 md:p-8">
          {loading ? (
            <p className="text-gray-300 text-lg">Loading exercises...</p>
          ) : exercises.length === 0 ? (
            <p className="text-gray-400 text-lg">
              Select a category to see exercises.
            </p>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-6">
                <span className="text-white">{selected}</span>{" "}
                <span className="text-cyan-400">Exercises</span>
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                {exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="rounded-2xl border border-cyan-400/20 bg-[#1f2937]/80 p-5 shadow-md hover:shadow-[0_0_18px_rgba(6,182,212,0.15)] transition"
                  >
                    <p className="text-xl font-bold text-cyan-400">{ex.name}</p>

                    {ex.description ? (
                      <div
                        className="text-sm text-gray-300 mt-3 leading-6"
                        dangerouslySetInnerHTML={{
                          __html: ex.description.slice(0, 220) + "...",
                        }}
                      />
                    ) : (
                      <p className="text-sm text-gray-400 mt-3">
                        No description available.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
