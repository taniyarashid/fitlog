import Link from "next/link";
import { FaRegClock, FaFire, FaStar } from "react-icons/fa";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-line bg-card transition hover:border-accent"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-line px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-display text-xl font-bold uppercase tracking-wide">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-sm text-muted">{workout.equipment}</p>

        {/* Stats */}
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <FaRegClock /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <FaFire /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <FaStar className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}