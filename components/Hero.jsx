import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
      {/* Text */}
      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Workout Library
        </p>

        <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
          Train with intent. <span className="text-accent">Log every set.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-base font-semibold uppercase tracking-wider text-black transition hover:brightness-90"
        >
          Browse Workouts
          <FaArrowDown />
        </a>
      </div>

      {/* Image */}
      {/* Image */}
<div className="flex justify-center">
  <img
    src="/assets/banner.png"
    alt="Person training at the gym"
    className="h-auto w-full max-w-xl rounded-2xl"
  />
</div>
    </section>
  );
}