import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-8xl font-bold text-accent sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        This page skipped leg day and disappeared. Head back to the library and
        pick a lift.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-display font-semibold uppercase tracking-wider text-black transition hover:brightness-90"
      >
        Go to workouts
      </Link>
    </main>
  );
}