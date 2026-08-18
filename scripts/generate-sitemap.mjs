// Generates public/sitemap.xml from the app's static routes plus every
// project slug. Runs automatically before each build (see package.json).
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import projects from "../src/projects/index.js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outPath = path.join(root, "public", "sitemap.xml");
const SITE = "https://codycodez.com";

const staticRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/projects", priority: "0.8" },
  { path: "/homelab", priority: "0.6" },
  { path: "/tech-help", priority: "0.9" },
  { path: "/resume", priority: "0.5" },
  { path: "/contact", priority: "0.7" },
];

const projectRoutes = projects.map((p) => ({
  path: `/projects/${p.slug}`,
  priority: "0.6",
}));

const routes = [...staticRoutes, ...projectRoutes];
const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(outPath, xml);
console.log(`Wrote ${routes.length} URLs to public/sitemap.xml`);
