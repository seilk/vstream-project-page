/**
 * GitHub Pages static export config.
 *
 * For project pages (https://<user>.github.io/<repo>/), set NEXT_PUBLIC_BASE_PATH=/repo.
 * For user/org root pages (https://<user>.github.io/), leave empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  // Pin workspace root to this project so Next.js doesn't pick up a parent lockfile.
  outputFileTracingRoot: new URL('.', import.meta.url).pathname,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
