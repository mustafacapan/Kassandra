import type { Metadata } from "next";
import PageContent from "./PageContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "Kassandra Prophecy — Cyber Risk in Financial Terms",
  },
  description:
    "Translate cyber risk into boardroom financials. ALE, VaR 99%, and choke-point ROI for CISOs and CFOs. Choke-point driven security investment with provable returns.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kassandra Prophecy — Cyber Risk in Financial Terms",
    description:
      "Translate cyber risk into boardroom financials. ALE, VaR 99%, and choke-point ROI for CISOs and CFOs. Choke-point driven security investment with provable returns.",
    url: "https://kassandraprophecy.com/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kassandra Prophecy — Cyber Risk in Financial Terms",
    description:
      "Translate cyber risk into boardroom financials. ALE, VaR 99%, and choke-point ROI for CISOs and CFOs. Choke-point driven security investment with provable returns.",
  },
};

export default function Page() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kassandra Prophecy",
    url: "https://kassandraprophecy.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://kassandraprophecy.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <>
      <JsonLd data={websiteSchema} />
      <PageContent />
    </>
  );
}
