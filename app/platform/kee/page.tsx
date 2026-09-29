import type { Metadata } from "next";
import KeePlatformPage from "./PageContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cyber Risk in Currency",
  description:
    "Translate cyber risk into boardroom financials. ALE, VaR 99%, and Monte Carlo simulation across 100,000 scenarios. Model every breach in currency.",
  alternates: {
    canonical: "/platform/kee",
  },
  openGraph: {
    title: "Cyber Risk in Currency | Kassandra Prophecy",
    description:
      "Translate cyber risk into boardroom financials. ALE, VaR 99%, and Monte Carlo simulation across 100,000 scenarios. Model every breach in currency.",
    url: "https://kassandraprophecy.com/platform/kee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Risk in Currency | Kassandra Prophecy",
    description:
      "Translate cyber risk into boardroom financials. ALE, VaR 99%, and Monte Carlo simulation across 100,000 scenarios. Model every breach in currency.",
  },
};

export default function Page() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kassandra Economics Engine (KEE)",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Cloud (Web)",
    description:
      "Translate cyber risk into boardroom financials. ALE, VaR 99%, and Monte Carlo simulation across 100,000 scenarios.",
    url: "https://kassandraprophecy.com/platform/kee",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Enterprise pricing available on request",
    },
    featureList: [
      "Monte Carlo simulation",
      "KVKK 2026 compliance",
      "Multi-currency risk modeling",
      "ROI calculation",
    ],
    provider: {
      "@type": "Organization",
      name: "Kassandra Prophecy",
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kassandraprophecy.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Platform",
        item: "https://kassandraprophecy.com/platform",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "KEE",
        item: "https://kassandraprophecy.com/platform/kee",
      },
    ],
  };
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <KeePlatformPage />
    </>
  );
}
