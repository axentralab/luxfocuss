import Link from "next/link";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-emerald-300">Marketplace</div>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white">Premium trading products</h1>
        </div>
        <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
          Demo inventory
        </div>
      </div>

      <div className="mb-10 grid gap-4 rounded-3xl border border-white/10 bg-[#0b1118] p-5 md:grid-cols-2 xl:grid-cols-6">
        {[
          "Category",
          "Platform",
          "Market",
          "Timeframe",
          "Strategy",
          "Price",
        ].map((label) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
            {label}
          </div>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <span className="rounded-full bg-slate-800 px-3 py-1.5">Popular</span>
        <span className="rounded-full bg-slate-800 px-3 py-1.5">Newest</span>
        <span className="rounded-full bg-slate-800 px-3 py-1.5">Price low → high</span>
        <span className="rounded-full bg-slate-800 px-3 py-1.5">Highest rated</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/pricing" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
          View Pricing
        </Link>
      </div>
    </main>
  );
}
