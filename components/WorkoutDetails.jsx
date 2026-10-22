"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaPlus, FaRegBookmark } from "react-icons/fa";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { plan, addToPlan, saveForLater } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setWorkout(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-40">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-display text-4xl uppercase">Workout not found</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-accent px-6 py-3 font-display font-semibold uppercase text-black"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  const planFull = plan.length >= 5 && !plan.some((p) => p.id === workout.id);

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-16">
      {/* Left: image */}
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right: details */}
      <div>
        <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">
          {workout.name}
        </h1>
        <p className="mt-3 text-muted">{workout.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-line px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Key specs */}
        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-card">
          <h2 className="border-b border-line px-5 py-3 font-display text-sm uppercase tracking-[0.2em] text-accent">
            Key Specs
          </h2>
          {specs.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between border-b border-line px-5 py-3 last:border-b-0"
            >
              <span className="text-sm uppercase tracking-wider text-muted">
                {label}
              </span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <h2 className="mt-8 font-display text-2xl uppercase">Instructions</h2>
        <ol className="mt-4 space-y-3">
          {workout.instructions.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">
                {index + 1}
              </span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => addToPlan(workout.id)}
            disabled={planFull}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-display font-semibold uppercase tracking-wider text-black transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaPlus /> Add to today&apos;s plan
          </button>
          <button
            onClick={() => saveForLater(workout.id)}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-accent px-6 py-3 font-display font-semibold uppercase tracking-wider text-accent transition hover:bg-accent hover:text-black"
          >
            <FaRegBookmark /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}