 import "./src/env.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const config = {
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["gsap", "framer-motion", "lottie-react"],
    // ✅ بيقلل الـ CSS اللي بيبلوك الرندر
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default config;