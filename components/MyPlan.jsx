"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegClock, FaFire, FaStar, FaCheck, FaTimes } from "react-icons/fa";
import { usePlan } from "@/context/PlanContext";

export default function MyPlan() {
  const { plan, saved, ready, removeFromPlan, removeFromSaved, markDone } =
    usePlan();

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("plan");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch(() => setWorkouts([]))
      .finally(() => setLoading(false));
  }, []);

  // join the stored ids with the full workout data
  const planItems = plan
    .map((p) => {
      const w = workouts.find((x) => x.id === p.id);
      return w ? { ...w, done: p.done } : null;
    })
    .filter(Boolean);

  const savedItems = saved
    .map((id) => workouts.find((x) => x.id === id))
    .filter(Boolean);

  const exercises = planItems.length;
  const minutes = planItems.reduce((sum, w) => sum + w.duration, 0);
  const calories = planItems.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const items = tab === "plan" ? planItems : savedItems;
  const isLoading = loading || !ready;

  const stats = [
    ["Exercises", exercises],
    ["Minutes", minutes],
    ["Calories", calories],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">
        My Plan
      </h1>
      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-line bg-card p-5"
          >
            <p className="text-sm uppercase tracking-wider text-muted">
              {label}
            </p>
            <p className="mt-1 font-display text-4xl font-bold text-accent">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-line">
        <button
          onClick={() => setTab("plan")}
          className={`cursor-pointer px-4 py-3 font-display text-sm uppercase tracking-wider ${
            tab === "plan"
              ? "border-b-2 border-accent text-accent"
              : "text-muted hover:text-white"
          }`}
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`cursor-pointer px-4 py-3 font-display text-sm uppercase tracking-wider ${
            tab === "saved"
              ? "border-b-2 border-accent text-accent"
              : "text-muted hover:text-white"
          }`}
        >
          Saved
        </button>
      </div>

      {/* List */}
      <div className="mt-6">
        {isLoading ? (
          <p className="py-20 text-center text-muted">Loading workouts…</p>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-line bg-card px-6 py-16 text-center">
            <h2 className="font-display text-3xl uppercase">
              Nothing here yet
            </h2>
            <p className="mt-2 text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-md bg-accent px-6 py-3 font-display font-semibold uppercase tracking-wider text-black transition hover:brightness-90"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((w) => (
              <li
                key={w.id}
                className={`flex flex-col gap-4 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center ${
                  tab === "plan" && w.done ? "opacity-60" : ""
                }`}
              >
                <img
                  src={w.image}
                  alt={w.name}
                  className="h-24 w-full rounded-lg object-cover sm:w-32"
                />

                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold uppercase">
                    {w.name}
                    {tab === "plan" && w.done && (
                      <span className="ml-3 text-sm text-accent">Done</span>
                    )}
                  </h3>
                  <p className="text-sm text-muted">{w.equipment}</p>
                  <div className="mt-2 flex gap-5 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <FaRegClock /> {w.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaFire /> {w.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaStar className="text-accent" /> {w.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workout/${w.id}`}
                    className="rounded-md border border-line px-4 py-2 text-sm font-semibold uppercase tracking-wider transition hover:border-accent hover:text-accent"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      onClick={() => markDone(w.id)}
                      disabled={w.done}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wider text-black transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaCheck /> Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() =>
                      tab === "plan"
                        ? removeFromPlan(w.id)
                        : removeFromSaved(w.id)
                    }
                    aria-label="Remove"
                    className="cursor-pointer rounded-md border border-line p-2.5 text-muted transition hover:border-red-500 hover:text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}