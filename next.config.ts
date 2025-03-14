import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    "@codemirror/lang-javascript",
    "@uiw/codemirror-theme-vscode",
    "@uiw/react-codemirror",
  ],
};

export default nextConfig;
