import type { Metadata } from "next";
import BlogPage from "./PageContent";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on cyber risk quantification, choke point analysis, and security economics.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Kassandra Prophecy",
    description:
      "Insights on cyber risk quantification, choke point analysis, and security economics.",
    url: "https://kassandraprophecy.com/blog",
    type: "website",
  },
};

export default function Page() {
  const posts = getAllPosts();
  return <BlogPage posts={posts} />;
}
