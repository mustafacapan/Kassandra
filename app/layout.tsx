import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kassandra Prophecy",
  url: "https://kassandraprophecy.com",
  logo: "https://kassandraprophecy.com/logo.jpeg",
  description:
    "Cyber risk quantification platform that translates security posture into boardroom financials.",
  foundingDate: "2024",
  sameAs: [
    "https://www.linkedin.com/in/mustafacapan",
    "https://github.com/mustafacapan/Kassandra",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    email: "hello@kassandraprophecy.com",
    availableLanguage: ["English", "Turkish"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F6F8" },
    { media: "(prefers-color-scheme: dark)", color: "#1A2834" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kassandraprophecy.com"),
  title: {
    default: "Kassandra Prophecy — Cyber Risk in Financial Terms",
    template: "%s | Kassandra Prophecy",
  },
  description:
    "Translate cyber risk into boardroom financials. ALE, VaR 99%, and choke-point ROI for CISOs and CFOs. Choke-point driven security investment with provable returns.",
  keywords: [
    "cyber risk quantification",
    "choke point analysis",
    "cloud security posture management",
    "KVKK 6698 compliance",
    "Monte Carlo simulation security",
    "CISO dashboard",
    "CFO cyber risk",
    "FAIR risk model",
    "attack path analysis",
    "security ROI",
  ],
  authors: [{ name: "Kassandra Prophecy" }],
  creator: "Kassandra Prophecy",
  publisher: "Kassandra Prophecy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    url: "https://kassandraprophecy.com",
    siteName: "Kassandra Prophecy",
    title: "Kassandra Prophecy — See the threat before it lands",
    description:
      "Choke-point driven ROI: prove that a $15,000 fix prevents a $2.4M financial exposure. Cyber risk quantified in currency.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kassandra Prophecy — Cyber Risk in Financial Terms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kassandra Prophecy — See the threat before it lands",
    description:
      "Choke-point driven ROI: prove that a $15,000 fix prevents a $2.4M financial exposure.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "tr-TR": "/tr",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification code goes here (later)
    // google: 'verification-code',
  },
  category: "technology",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
