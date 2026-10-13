import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "*.replit.dev",
    "*.pike.replit.dev",
    "*.replit.app",
    "*.repl.co",
  ],
};

export default nextConfig;
