import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-temp.vercel.app";
const titleDefault = "Systems, training, and pricing that raise NOI";
const description =
  "Modular help for multifamily: revenue, CRM lifecycle, platform rollouts, reporting, lease-up, and ops.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: "%s • Consulting",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: titleDefault,
    description,
    siteName: "Consulting",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/twitter-image"],
  },
  robots: { index: true, follow: true },
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
