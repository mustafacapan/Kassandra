"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getAllPosts } from "@/lib/blog";

function BlogList({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <main className="min-h-screen bg-[#F4F6F8] text-[#1A2834]">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-[#2B5372] transition-colors duration-150 hover:text-[#1E3F58]"
        >
          {t("blog.back.home")}
        </Link>
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            {t("blog.eyebrow")}
          </p>
          <h1 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
            {t("blog.title")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5A68]">
            {t("blog.body")}
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="mx-auto mt-16 max-w-xl pb-24 text-center"
          >
            <p className="apple-headline text-2xl font-semibold tracking-tight text-[#1A2834] md:text-3xl">
              {t("blog.empty.title")}
            </p>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#4A5A68]">
              {t("blog.empty.body")}
            </p>
            <a
              href="mailto:mustafa@kassandraprophecy.com?subject=Blog subscription"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#2B5372] px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#1E3F58] active:scale-[0.96]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {t("blog.empty.subscribe")}
            </a>
          </motion.div>
        ) : (
          <div className="grid gap-4 py-16 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[rgba(43,83,114,0.10)] bg-white p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] active:scale-[0.96]"
                >
                  <p className="text-xs tabular-nums text-[#7A8A98]">{p.date}</p>
                  <p className="apple-headline mt-2 text-xl font-semibold tracking-tight text-[#1A2834] text-balance">
                    {p.title}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4A5A68]">
                    {p.excerpt}
                  </p>
                  <p className="mt-4 text-xs font-semibold tabular-nums text-[#7A8A98]">
                    {t("blog.card.readtime").replace("{n}", String(p.readingTime))}{" "}
                    ·{" "}
                    <span className="text-[#2B5372]">
                      {t("blog.card.read")} →</span>
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function BlogPage({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  return (
    <I18nProvider>
      <BlogList posts={posts} />
    </I18nProvider>
  );
}
