import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/* Requis par `output: "export"` : le sitemap est figé au build. */
export const dynamic = "force-static";

const routes = [
  "",
  "/solutions",
  "/methode",
  "/exponentos",
  "/entreprise",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    /* Slash final : `trailingSlash` rend `/entreprise/` canonique, et une URL
       sans slash coûterait une redirection 301 à chaque crawl. */
    url: `${SITE.url}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
