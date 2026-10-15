import PoolQuiz from "@/components/PoolQuiz";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-ocean-50/30 to-aqua-300/10">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ocean-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-aqua-300/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-ocean-100/40 blur-3xl" />
      </div>

      <div className="relative px-4 py-6 sm:px-6 sm:py-10 lg:py-12">
        <PoolQuiz />
      </div>
    </main>
  );
}
