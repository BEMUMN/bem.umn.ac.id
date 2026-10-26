import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",

    // the old directory page now lives in the home Divisi chapter
    async redirects() {
        return [
            { source: "/divisi", destination: "/#divisi", permanent: true },
        ];
    },

    // For static Build
    // output: "export"
    // images: { unoptimized: true },
};

export default nextConfig;
