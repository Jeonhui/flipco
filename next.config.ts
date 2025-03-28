import type { NextConfig } from "next";
import {createVanillaExtractPlugin} from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    distDir: "out",
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
}

export default withVanillaExtract(nextConfig);
