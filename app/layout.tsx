import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Tarayıcı sekmesindeki Başlık ve İkon ayarları
export const metadata: Metadata = {
  title: "Kassandra",
  description: "Autonomous Graph-Based Cloud Security & Auditing Engine",
  icons: {
    icon: "/logo.jpeg", // 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}