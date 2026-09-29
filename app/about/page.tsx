import type { Metadata } from "next";
import AboutPage from "./PageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kassandra Prophecy was founded by Mustafa Çapan to translate cloud security risk into boardroom financials.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Kassandra Prophecy",
    description:
      "Kassandra Prophecy was founded by Mustafa Çapan to translate cloud security risk into boardroom financials.",
    url: "https://kassandraprophecy.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Kassandra Prophecy",
    description:
      "Kassandra Prophecy was founded by Mustafa Çapan to translate cloud security risk into boardroom financials.",
  },
};

export default function Page() {
  return <AboutPage />;
}
