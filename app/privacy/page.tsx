import type { Metadata } from "next";
import PrivacyPage from "./PageContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kassandra Prophecy collects, uses, and protects your personal data under GDPR and KVKK.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Kassandra Prophecy",
    description:
      "How Kassandra Prophecy collects, uses, and protects your personal data under GDPR and KVKK.",
    url: "https://kassandraprophecy.com/privacy",
    type: "website",
  },
};

export default function Page() {
  return <PrivacyPage />;
}
