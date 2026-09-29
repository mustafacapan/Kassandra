import type { Metadata } from "next";
import AgentlessPage from "./PageContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Agentless Scanning",
  description:
    "Read entire file systems from raw cloud snapshots. Zero agents, zero mount risk, zero server impact.",
  alternates: {
    canonical: "/platform/agentless",
  },
  openGraph: {
    title: "Agentless Scanning | Kassandra Prophecy",
    description:
      "Read entire file systems from raw cloud snapshots. Zero agents, zero mount risk, zero server impact.",
    url: "https://kassandraprophecy.com/platform/agentless",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentless Scanning | Kassandra Prophecy",
    description:
      "Read entire file systems from raw cloud snapshots. Zero agents, zero mount risk, zero server impact.",
  },
};

export default function Page() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kassandra Agentless Scanning",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Cloud (Web)",
    description:
      "Read entire file systems from raw cloud snapshots. Zero agents, zero mount risk, zero server impact.",
    url: "https://kassandraprophecy.com/platform/agentless",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Enterprise pricing available on request",
    },
    featureList: [
      "Agentless snapshot scanning",
      "Sparse block streaming",
      "In-memory reconstruction",
      "Secrets and CVE detection",
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
        name: "Agentless",
        item: "https://kassandraprophecy.com/platform/agentless",
      },
    ],
  };
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AgentlessPage />
    </>
  );
}
