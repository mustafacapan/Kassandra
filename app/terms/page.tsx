import type { Metadata } from "next";
import TermsPage from "./PageContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of the Kassandra Prophecy website.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Kassandra Prophecy",
    description:
      "Terms and conditions governing the use of the Kassandra Prophecy website.",
    url: "https://kassandraprophecy.com/terms",
    type: "website",
  },
};

export default function Page() {
  return <TermsPage />;
}
