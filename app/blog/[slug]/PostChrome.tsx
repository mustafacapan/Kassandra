"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function PostChrome({
  date,
  readingTime,
}: {
  date: string;
  readingTime: number;
}) {
  const { t } = useI18n();

  return (
    <>
      <Link
        href="/"
        className="mb-4 block text-sm font-semibold text-[#2B5372] transition-colors duration-150 hover:text-[#1E3F58]"
      >
        {t("blog.back.home")}
      </Link>
      <Link
        href="/blog"
        className="mb-6 inline-block text-sm font-semibold text-[#2B5372] transition-colors duration-150 hover:text-[#1E3F58]"
      >
        {t("blog.post.back")}
      </Link>
      <p className="text-xs tabular-nums text-[#7A8A98]">
        {date} · {readingTime} {t("blog.post.readtimeUnit")}
      </p>
    </>
  );
}
