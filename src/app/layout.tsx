import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { buildMetadata, generateStructuredData } from "@/lib/seo";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

import { PageProgressBar } from "@/components/ui/PageProgressBar";

/* Manrope used to be loaded here as a second family. Nothing ever rendered in
   it — it sat behind Jakarta in the font-family chain, and Jakarta covers
   latin, so the fallback never fired. That was four woff2 files fetched on
   every cold load for zero visual effect.

   Weights are declared as a variable range rather than a fixed list: Jakarta
   ships a variable font, so one file covers 400-800 and is smaller than the
   five static cuts it replaces. `font-black` (900) appears a handful of times
   in the pricing page and is outside Jakarta's range — it clamps to 800 rather
   than being synthetically emboldened, which is the better of the two. */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: "variable",
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
      className={`${plusJakarta.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
        />
        {/* <Reveal> starts at opacity:0 and is un-hidden by its own effect, so
            without this any scroll-revealed section would stay invisible with
            scripting off — the markup is server-rendered and present, just
            transparent. The old framer-motion reveals had the same hole. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body
        className="min-h-screen flex flex-col bg-white text-brand-ink selection:bg-brand-aqua/30 selection:text-brand-ink"
        suppressHydrationWarning
      >
        <PageProgressBar />
        {children}
        {/* Rendered once here so every route gets it, including /_not-found */}
        <ScrollToTop />
      </body>
    </html>
  );
}
