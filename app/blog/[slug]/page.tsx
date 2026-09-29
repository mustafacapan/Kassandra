import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { I18nProvider } from "@/lib/i18n";
import PostChrome from "./PostChrome";

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 mb-4 text-2xl font-semibold text-[#1A2834]" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-[#1A2834]" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 text-base leading-relaxed text-[#4A5A68]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-[#4A5A68]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "";
    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-[#2B5372] underline underline-offset-4 hover:text-[#E07A5F]"
        >
          {props.children}
        </Link>
      );
    }
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return (
      <a
        className="text-[#2B5372] underline underline-offset-4 hover:text-[#E07A5F]"
        {...props}
      />
    );
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-[#E8EDF2] px-1.5 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-6 overflow-x-auto rounded-xl bg-[#E8EDF2]/50 p-5 font-mono text-[13px] leading-relaxed text-[#1A2834] tabular-nums"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-[rgba(43,83,114,0.10)]">
      <table className="w-full min-w-[640px] border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[#E8EDF2]" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-semibold text-[#1A2834]" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-t border-[rgba(43,83,114,0.10)] px-4 py-3 text-[#4A5A68]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 border-[#10B981] pl-4 italic text-[#4A5A68]" {...props} />
  ),
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const { title, excerpt } = post.meta;
  return {
    title,
    description: excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${title} | Kassandra Prophecy`,
      description: excerpt,
      url: `https://kassandraprophecy.com/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { title, date, readingTime } = post.meta;

  return (
    <main className="bg-[#F4F6F8] text-[#1A2834]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <I18nProvider>
          <PostChrome date={date} readingTime={readingTime} />
        </I18nProvider>
        <h1 className="apple-headline mt-3 text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
          {title}
        </h1>
        <div className="mt-8">
          <MDXRemote
            source={post.content}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </div>
    </main>
  );
}
