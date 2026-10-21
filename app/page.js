import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* temporary placeholder, we'll build the library here next */}
      <section id="library" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl uppercase">The Library</h2>
      </section>
    </main>
  );
}