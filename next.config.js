/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
    domains: ["4xncq3cvtijkuxxr.public.blob.vercel-storage.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4xncq3cvtijkuxxr.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
};

export default config;
