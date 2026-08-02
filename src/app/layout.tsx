import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { buildMetadata, generateStructuredData } from "@/lib/seo";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${manrope.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-white text-brand-ink selection:bg-brand-aqua/30 selection:text-brand-ink"
        suppressHydrationWarning
      >
        {children}
        {/* Rendered once here so every route gets it, including /_not-found */}
        <ScrollToTop />
      </body>
    </html>
  );
}
