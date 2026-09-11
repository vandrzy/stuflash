import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-zinc-900 to-black text-slate-100 font-sans selection:bg-indigo-500 selection:text-white px-4">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-8 py-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium backdrop-blur-md shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          Next.js 16 + Tailwind CSS v4 Ready
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Welcome to <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">StuFlash</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
          Project Next.js telah berhasil dikonfigurasi dengan Tailwind CSS, TypeScript, dan App Router. Siap digunakan untuk pengembangan aplikasi!
        </p>

        {/* Call to actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Next.js Documentation &rarr;
          </a>
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 font-semibold backdrop-blur-md hover:bg-slate-800/80 hover:border-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Tailwind CSS Docs
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-12 text-left">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:border-indigo-500/40 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 font-mono font-bold">
              ⚡
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">App Router</h3>
            <p className="text-xs text-slate-400">Standard Next.js App Router structure with TypeScript support.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:border-purple-500/40 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 font-mono font-bold">
              🎨
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Tailwind CSS v4</h3>
            <p className="text-xs text-slate-400">Configured via @tailwindcss/postcss for fast, utility-first styling.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:border-pink-500/40 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-3 font-mono font-bold">
              🛡️
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">TypeScript & ESLint</h3>
            <p className="text-xs text-slate-400">Strict type checks and linting configured out of the box.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

