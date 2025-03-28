import type { NextConfig } from "next";
import {createVanillaExtractPlugin} from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
    trailingSlash: true,
    output: "export",
    images: {
        unoptimized: true,
    },
    distDir: "out",
    pageExtensions: ["ts", "tsx", "js", "jsx"],
}

export default withVanillaExtract(nextConfig);
