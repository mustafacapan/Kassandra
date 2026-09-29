import type { Metadata } from "next";
import KiePlatformPage from "./PageContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Zero-Trust AI Storyteller",
  description:
    "Executive-ready narratives without leaking a single byte of infrastructure data. Five specialized AI agents running locally — zero API keys, zero cloud dependency.",
  alternates: {
    canonical: "/platform/kie",
  },
  openGraph: {
    title: "Zero-Trust AI Storyteller | Kassandra Prophecy",
    description:
      "Executive-ready narratives without leaking a single byte of infrastructure data. Five specialized AI agents running locally — zero API keys, zero cloud dependency.",
    url: "https://kassandraprophecy.com/platform/kie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero-Trust AI Storyteller | Kassandra Prophecy",
    description:
      "Executive-ready narratives without leaking a single byte of infrastructure data. Five specialized AI agents running locally — zero API keys, zero cloud dependency.",
  },
};

export default function Page() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kassandra Intelligence Engine (KIE)",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Cloud (Web)",
    description:
      "Executive-ready narratives without leaking infrastructure data. Five specialized AI agents running locally.",
    url: "https://kassandraprophecy.com/platform/kie",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Enterprise pricing available on request",
    },
    featureList: [
      "Five specialized AI agents",
      "Adversarial self-play duel",
      "Local LLM, zero API keys",
      "Executive storytelling",
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
        name: "KIE",
        item: "https://kassandraprophecy.com/platform/kie",
      },
    ],
  };
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <KiePlatformPage />
    </>
  );
}
