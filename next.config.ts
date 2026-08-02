import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF first, WebP as the fallback. Next picks per-request from the
       browser's Accept header, and array order decides preference. The four
       site photographs are large, flat-toned clinical shots, which is exactly
       where AVIF's advantage over WebP is widest.

       The cost is storage: each source is now cached in both formats. For four
       images that is irrelevant. */
    formats: ["image/avif", "image/webp"],

    /* These are static assets on stable paths that only change on redeploy,
       so there is nothing to gain from re-optimizing them daily. 31 days. */
    minimumCacheTTL: 60 * 60 * 24 * 31,

    /* The `remotePatterns` allowlist for images.unsplash.com was removed —
       every image is local to /public/images now, and leaving an unused remote
       host allowlisted is a needless open door for the optimizer. */
  },

  experimental: {
    /* lucide-react is already on Next's default optimize list. framer-motion
       is not, and 58 files import it here — this trims those imports to the
       modules actually used rather than pulling the whole barrel. */
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
