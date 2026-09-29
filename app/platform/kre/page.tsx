import type { Metadata } from "next";
import KrePlatformPage from "./PageContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Choke Point Attack Path Analysis",
  description:
    "Find the single bottleneck that cuts 90% of attack paths. Choke-point driven ROI: prove that a $15,000 fix prevents a $2.4M financial exposure.",
  alternates: {
    canonical: "/platform/kre",
  },
  openGraph: {
    title: "Choke Point Attack Path Analysis | Kassandra Prophecy",
    description:
      "Find the single bottleneck that cuts 90% of attack paths. Choke-point driven ROI: prove that a $15,000 fix prevents a $2.4M financial exposure.",
    url: "https://kassandraprophecy.com/platform/kre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choke Point Attack Path Analysis | Kassandra Prophecy",
    description:
      "Find the single bottleneck that cuts 90% of attack paths. Choke-point driven ROI: prove that a $15,000 fix prevents a $2.4M financial exposure.",
  },
};

export default function Page() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kassandra Risk Engine (KRE)",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Cloud (Web)",
    description:
      "Choke-point driven attack path analysis. Find the single bottleneck that cuts 90% of attack paths.",
    url: "https://kassandraprophecy.com/platform/kre",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Enterprise pricing available on request",
    },
    featureList: [
      "Attack path analysis",
      "Choke point detection",
      "Financial risk quantification",
      "What-if simulations",
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
        name: "KRE",
        item: "https://kassandraprophecy.com/platform/kre",
      },
    ],
  };
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <KrePlatformPage />
    </>
  );
}
