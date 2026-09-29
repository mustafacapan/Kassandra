import type { Metadata } from "next";
import PicturesPage from "./PageContent";

export const metadata: Metadata = {
  title: "Platform Screenshots",
  description:
    "Real product screenshots from Kassandra Prophecy. Choke-point dashboard, Monte Carlo simulations, and executive storytelling views.",
  alternates: {
    canonical: "/pictures",
  },
  openGraph: {
    title: "Platform Screenshots | Kassandra Prophecy",
    description:
      "Real product screenshots from Kassandra Prophecy. Choke-point dashboard, Monte Carlo simulations, and executive storytelling views.",
    url: "https://kassandraprophecy.com/pictures",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Screenshots | Kassandra Prophecy",
    description:
      "Real product screenshots from Kassandra Prophecy. Choke-point dashboard, Monte Carlo simulations, and executive storytelling views.",
  },
};

export default function Page() {
  return <PicturesPage />;
}
