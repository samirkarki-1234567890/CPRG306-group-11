"use client";
import { useState, useEffect } from "react";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

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
    const res = await fetch("/api/workouts");
    const data = await res.json();
    setWorkouts(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-4xl font-black mb-2">
          WORK<span className="text-[#00ADB5]">OUTS</span>
        </h1>
        <p className="text-[#EEEEEE]/50 mb-8">Log and track your training sessions.</p>

        {/* Form */}
        <div className="bg-[#393E46] p-6 rounded-xl border border-[#00ADB5]/20 mb-8 flex flex-col gap-3">
          <input
            className="bg-[#222831] border border-[#00ADB5]/30 text-[#EEEEEE] p-3 rounded-lg placeholder-[#EEEEEE]/30 focus:outline-none focus:border-[#00ADB5]"
            placeholder="Exercise name (e.g. Bench Press)"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
          <input
            className="bg-[#222831] border border-[#00ADB5]/30 text-[#EEEEEE] p-3 rounded-lg placeholder-[#EEEEEE]/30 focus:outline-none focus:border-[#00ADB5]"
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <input
            className="bg-[#222831] border border-[#00ADB5]/30 text-[#EEEEEE] p-3 rounded-lg placeholder-[#EEEEEE]/30 focus:outline-none focus:border-[#00ADB5]"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#00ADB5] text-[#222831] font-black p-3 rounded-lg hover:bg-[#00cedb] transition-all"
          >
            {loading ? "Saving..." : "LOG WORKOUT"}
          </button>
        </div>

        {/* Workout List */}
        <h2 className="text-xl font-bold mb-4 text-[#00ADB5]">Past Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-[#EEEEEE]/40">No workouts logged yet.</p>
        ) : (
          workouts.map((w: any) => (
            <div key={w.id} className="bg-[#393E46] border border-[#00ADB5]/20 p-4 rounded-xl mb-3">
              <p className="font-bold text-lg">{w.exercise}</p>
              <p className="text-[#00ADB5] text-sm">{w.sets} sets × {w.reps} reps</p>
              <p className="text-[#EEEEEE]/30 text-xs mt-1">{new Date(w.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}