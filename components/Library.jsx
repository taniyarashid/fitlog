"use client";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // sort a copy, so the original data is not changed
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    return b.rating - a.rating;
  });

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
            The Library
          </h2>
          <p className="mt-2 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-sm font-semibold uppercase tracking-wider text-muted"
          >
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer appearance-none rounded-md border border-line bg-card py-2 pl-4 pr-10 text-sm font-semibold text-white outline-none focus:border-accent"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-accent" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
        </div>
      ) : error ? (
        <p className="py-24 text-center text-muted">
          Could not load workouts. Please try again later.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}