import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consulting — Systems, training, and pricing that raise NOI",
  description:
    "Modular help for multifamily: revenue, CRM lifecycle, platform rollouts, reporting, lease-up, and ops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
