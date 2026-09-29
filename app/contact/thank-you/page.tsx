import type { Metadata } from "next";
import ThanksPage from "./PageContent";

export const metadata: Metadata = {
  title: {
    absolute: "Thank you | Kassandra Prophecy",
  },
  description: "Your briefing request has been received.",
  alternates: {
    canonical: "/contact/thank-you",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <ThanksPage />;
}
