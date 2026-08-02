import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://notenra.com";
  const routes = [
    "",
    "/about",
    "/contact",
    "/pricing",
    "/security",
    "/privacy",
    "/terms",
    "/solutions/medical-billing",
    "/solutions/medical-coding",
    "/solutions/medical-documentation",
    "/solutions/payroll-management",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/solutions/") ? 0.8 : 0.5,
  }));
}
