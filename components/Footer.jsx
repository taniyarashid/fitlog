import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:px-6 md:flex-row md:text-left">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="FitLog logo"
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-xl font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        <p className="text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}