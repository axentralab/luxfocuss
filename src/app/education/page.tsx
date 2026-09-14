import Link from "next/link";
import { educationArticles } from "@/lib/mock-data";

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.25em] text-emerald-300">Education desk</div>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white">Learn the workflow before you automate it</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">Practical guides for platform setup, backtesting, drawdown, and indicator configuration. Built to help you make a more informed product decision.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {educationArticles.map((article, index) => (
          <article key={article.title} className="group rounded-[2rem] border border-white/10 bg-[#0b1118] p-6 transition hover:-translate-y-1 hover:border-emerald-400/40">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-emerald-300"><span>{article.category}</span><span>{article.readTime}</span></div>
            <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950 text-lg font-bold text-white">0{index + 1}</div>
            <h2 className="mt-6 text-2xl font-bold text-white">{article.title}</h2>
            <p className="mt-3 leading-7 text-slate-400">A concise guide from the Luxfocuss documentation desk for traders evaluating a repeatable, risk-aware process.</p>
            <Link href="/documentation" className="mt-6 inline-flex text-sm font-semibold text-emerald-300 transition group-hover:text-emerald-200">Open documentation →</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
