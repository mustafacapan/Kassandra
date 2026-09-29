import type { Metadata } from "next";
import KgePlatformPage from "./PageContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Audit-Ready Governance",
  description:
    "Tamper-proof cryptographic audit trails. Fresh data. Reliable signals. Predictive 30/60/90-day risk trajectory. ISO 27001 and SOC 2-ready.",
  alternates: {
    canonical: "/platform/kge",
  },
  openGraph: {
    title: "Audit-Ready Governance | Kassandra Prophecy",
    description:
      "Tamper-proof cryptographic audit trails. Fresh data. Reliable signals. Predictive 30/60/90-day risk trajectory. ISO 27001 and SOC 2-ready.",
    url: "https://kassandraprophecy.com/platform/kge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit-Ready Governance | Kassandra Prophecy",
    description:
      "Tamper-proof cryptographic audit trails. Fresh data. Reliable signals. Predictive 30/60/90-day risk trajectory. ISO 27001 and SOC 2-ready.",
  },
};

export default function Page() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kassandra Governance Engine (KGE)",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Cloud (Web)",
    description:
      "Tamper-proof cryptographic audit trails, SHA-256 hash-chained ledger, and predictive risk projections. ISO 27001 and SOC 2-ready governance.",
    url: "https://kassandraprophecy.com/platform/kge",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Enterprise pricing available on request",
    },
    featureList: [
      "SHA-256 hash-chained ledger",
      "30/60/90-day risk forecast",
      "Tamper detection",
      "Governance compliance index",
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
        name: "KGE",
        item: "https://kassandraprophecy.com/platform/kge",
      },
    ],
  };
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <KgePlatformPage />
    </>
  );
}
