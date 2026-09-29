import Link from "next/link";
import { ArrowUpRight, Home, Layers, Mail, type LucideIcon } from "lucide-react";

const CARDS: Array<{ href: string; Icon: LucideIcon; title: string; body: string }> = [
  { href: "/", Icon: Home, title: "Home", body: "Back to the beginning" },
  { href: "/platform", Icon: Layers, title: "Platform", body: "Explore the four engines" },
  { href: "/contact", Icon: Mail, title: "Contact", body: "Request a briefing" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-[#1A2834] px-6 py-20">
      <title>404 · Kassandra Prophecy</title>
      <style>{`@keyframes nf-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion:reduce){.nf-rise{animation:none!important;opacity:1!important;transform:none!important}}`}</style>
      <div className="w-full max-w-2xl text-center">
        <p
          aria-hidden
          className="nf-rise select-none text-[8rem] font-semibold leading-none tracking-tighter text-white/[0.06] md:text-[12rem]"
          style={{ animation: "nf-rise 0.6s ease-out both" }}
        >
          404
        </p>
        <p
          className="nf-rise mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#10B981]"
          style={{ animation: "nf-rise 0.5s ease-out 0.1s both" }}
        >
          {"// 404 · PATH NOT FOUND"}
        </p>
        <h1
          className="nf-rise mb-4 text-3xl font-semibold leading-[1.1] text-white md:text-5xl"
          style={{ animation: "nf-rise 0.5s ease-out 0.18s both" }}
        >
          This path doesn&apos;t exist.
        </h1>
        <p
          className="nf-rise mx-auto mb-10 max-w-md text-base text-white/60 md:text-lg"
          style={{ animation: "nf-rise 0.5s ease-out 0.26s both" }}
        >
          The page you&apos;re looking for was moved, removed, or never existed.
        </p>
        <p
          className="nf-rise mx-auto mb-12 max-w-md text-sm italic text-white/40"
          style={{ animation: "nf-rise 0.5s ease-out 0.34s both" }}
        >
          Even choke points need an exit. Try one of these:
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className="nf-rise group relative rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 text-left transition-colors duration-150 hover:bg-white/[0.08]"
              style={{ animation: `nf-rise 0.5s ease-out ${0.42 + i * 0.08}s both` }}
            >
              <ArrowUpRight
                className="absolute right-4 top-4 h-4 w-4 text-white/30 transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden
              />
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                <c.Icon className="h-5 w-5 text-[#10B981]" aria-hidden />
              </span>
              <span className="mb-1 block text-sm font-semibold text-white">{c.title}</span>
              <span className="block text-xs text-white/50">{c.body}</span>
            </Link>
          ))}
        </div>
        <p className="mt-10 font-mono text-[10px] tabular-nums text-white/30">
          Kassandra Prophecy · Path integrity verified
        </p>
      </div>
    </main>
  );
}
