"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing workouts
  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

  // Save a new workout
  const handleSubmit = async () => {
    if (!exercise || !sets || !reps) return;
    setLoading(true);
    await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercise,
        sets,
        reps,
        date: new Date().toISOString(),
      }),
    });
    setExercise("");
    setSets("");
    setReps("");

    const res = await fetch("/api/workouts");
    const data = await res.json();
    setWorkouts(data);
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
          FitTrack Workout Logger
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-cyan-500/20 mt-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.08),_transparent_30%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto rounded-[2rem] border border-cyan-400/30 bg-white/10 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.12)] px-8 py-12 md:px-14 md:py-14">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-center">
              <span className="text-white">WORKOUT </span>
              <span className="text-cyan-400">LOGGER</span>
            </h1>

            <p className="mt-6 text-center text-lg md:text-2xl text-gray-300 leading-relaxed">
              Track your{" "}
              <span className="text-cyan-400 font-semibold">progress</span>, log
              your <span className="text-cyan-400 font-semibold">workouts</span>
              , and stay consistent.
            </p>

            <div className="mt-10 flex justify-center">
              <div className="h-1 w-20 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="p-8 max-w-xl mx-auto">
        <div className="rounded-[1.5rem] border border-cyan-400/20 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg">
          {/* Form */}
          <div className="flex flex-col gap-3 mb-8">
            <input
              className="rounded-xl border border-cyan-400/20 bg-slate-800/80 text-white placeholder:text-gray-400 p-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              placeholder="Exercise name (e.g. Bench Press)"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            />
            <input
              className="rounded-xl border border-cyan-400/20 bg-slate-800/80 text-white placeholder:text-gray-400 p-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
            <input
              className="rounded-xl border border-cyan-400/20 bg-slate-800/80 text-white placeholder:text-gray-400 p-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-cyan-400 text-slate-900 p-3 rounded-xl font-semibold hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_18px_rgba(34,211,238,0.2)]"
            >
              {loading ? "Saving..." : "Log Workout"}
            </button>
          </div>

          {/* Workout List */}
          <h2 className="text-xl font-semibold mb-4 text-white">
            Past <span className="text-cyan-400">Workouts</span>
          </h2>

          {workouts.length === 0 ? (
            <p className="text-gray-400">No workouts logged yet.</p>
          ) : (
            workouts.map((w: any) => (
              <div
                key={w.id}
                className="rounded-xl border border-cyan-400/20 bg-[#1f2937]/80 p-4 mb-3 shadow-md hover:shadow-[0_0_18px_rgba(6,182,212,0.15)] transition"
              >
                <p className="font-bold text-cyan-400">{w.exercise}</p>
                <p className="text-sm text-gray-300">
                  {w.sets} sets × {w.reps} reps
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(w.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
