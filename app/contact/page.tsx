import type { Metadata } from "next";
import ContactPage from "./PageContent";

export const metadata: Metadata = {
  title: "Request an Executive Briefing",
  description:
    "A 30-minute walkthrough of your attack surface, modeled in financial terms. See your top 3 choke points in real time. No commitment.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Request an Executive Briefing | Kassandra Prophecy",
    description:
      "See your risk in currency. A 30-minute live walkthrough for CISOs and CFOs.",
    url: "https://kassandraprophecy.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request an Executive Briefing | Kassandra Prophecy",
    description:
      "See your risk in currency. A 30-minute live walkthrough for CISOs and CFOs.",
  },
};

export default function Page() {
  return <ContactPage />;
}
