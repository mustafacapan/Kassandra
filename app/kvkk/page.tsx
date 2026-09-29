import type { Metadata } from "next";
import KvkkPage from "./PageContent";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu Madde 10 kapsamında aydınlatma metni.",
  alternates: {
    canonical: "/kvkk",
  },
  openGraph: {
    title: "KVKK Aydınlatma Metni | Kassandra Prophecy",
    description:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu Madde 10 kapsamında aydınlatma metni.",
    url: "https://kassandraprophecy.com/kvkk",
    type: "website",
  },
};

export default function Page() {
  return <KvkkPage />;
}
