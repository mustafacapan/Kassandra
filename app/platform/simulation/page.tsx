import type { Metadata } from "next";
import SimulationPage from "./PageContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Live Simulation",
  description:
    "Interactive walkthrough of a full cyber risk simulation — from configuration to boardroom results.",
  alternates: {
    canonical: "/platform/simulation",
  },
  openGraph: {
    title: "Live Simulation | Kassandra Prophecy",
    description:
      "Interactive walkthrough of a full cyber risk simulation — from configuration to boardroom results.",
    url: "https://kassandraprophecy.com/platform/simulation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Simulation | Kassandra Prophecy",
    description:
      "Interactive walkthrough of a full cyber risk simulation — from configuration to boardroom results.",
  },
};

export default function Page() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kassandra Live Simulation",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Cloud (Web)",
    description:
      "Interactive walkthrough of a full cyber risk simulation — from 32 configuration rules to boardroom results.",
    url: "https://kassandraprophecy.com/platform/simulation",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Enterprise pricing available on request",
    },
    featureList: [
      "32-rule risk configuration",
      "KVKK 2026 penalty engine",
      "Monte Carlo resolution tiers",
      "Multi-currency modeling",
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
        name: "Simulation",
        item: "https://kassandraprophecy.com/platform/simulation",
      },
    ],
  };
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <SimulationPage />
    </>
  );
}
