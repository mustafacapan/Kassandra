import type { Metadata } from "next";
import PlatformPage from "./PageContent";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Four engines. One platform. Choke point analysis, financial risk quantification, zero-trust AI, and audit-ready governance — built to speak the language of the boardroom.",
  alternates: {
    canonical: "/platform",
  },
  openGraph: {
    title: "Platform | Kassandra Prophecy",
    description:
      "Four engines. One platform. Choke point analysis, financial risk quantification, zero-trust AI, and audit-ready governance — built to speak the language of the boardroom.",
    url: "https://kassandraprophecy.com/platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform | Kassandra Prophecy",
    description:
      "Four engines. One platform. Choke point analysis, financial risk quantification, zero-trust AI, and audit-ready governance — built to speak the language of the boardroom.",
  },
};

export default function Page() {
  return <PlatformPage />;
}
