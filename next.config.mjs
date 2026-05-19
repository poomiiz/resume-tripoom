import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Normalize Next.js `basePath` (must be "" or "/segment" without trailing slash).
 * @param {string | undefined} raw
 */
function normalizeBasePath(raw) {
  if (raw == null || raw === "") return "";
  const s = String(raw).trim();
  if (s === "/") return "";
  if (!s.startsWith("/")) return "";
  return s.replace(/\/$/, "");
}

// Custom domain at site root (e.g. resume-tripoom.moonracle.com): leave unset → "".
// Legacy GitHub project Pages (https://<org>.github.io/resume-tripoom/): set at build time, e.g.
//   NEXT_BASE_PATH=/resume-tripoom npm run build
//
// Never apply basePath during `next dev`: if NEXT_BASE_PATH is set in the shell (e.g. for deploy
// testing), opening http://localhost:3001/ would otherwise 404.
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? normalizeBasePath(process.env.NEXT_BASE_PATH) : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  outputFileTracingRoot: __dirname,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
