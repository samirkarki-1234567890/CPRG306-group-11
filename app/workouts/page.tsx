"use client";
import { useState, useEffect } from "react";

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
      body: JSON.stringify({ exercise, sets, reps, date: new Date().toISOString() }),
    });
    setExercise("");
    setSets("");
    setReps("");
    // Refresh list
    const res = await fetch("/api/workouts");
    const data = await res.json();
    setWorkouts(data);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Workout Logger</h1>

      {/* Form */}
      <div className="flex flex-col gap-3 mb-8">
        <input
          className="border p-2 rounded"
          placeholder="Exercise name (e.g. Bench Press)"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Log Workout"}
        </button>
      </div>

      {/* Workout List */}
      <h2 className="text-xl font-semibold mb-3">Past Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts logged yet.</p>
      ) : (
        workouts.map((w: any) => (
          <div key={w.id} className="border p-3 rounded mb-2">
            <p className="font-bold">{w.exercise}</p>
            <p className="text-sm text-gray-600">{w.sets} sets x {w.reps} reps</p>
            <p className="text-xs text-gray-400">{new Date(w.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}