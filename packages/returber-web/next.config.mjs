/** @type {import('next').NextConfig} */
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import BundleAnalyzer from '@next/bundle-analyzer';
import NextPWA from 'next-pwa';



const withBundleAnalyzer = BundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const withPWA = NextPWA({
    dest: 'public',
    maximumFileSizeToCacheInBytes: 50000000,
});


const nextConfig = {
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
    webpack: (config, { }) => {
        config.resolve.extensions.push('.ts', '.tsx');
        config.resolve.fallback = { fs: false };

        config.plugins.push(
            new NodePolyfillPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
                        to: 'static/chunks/',
                    }, {
                        from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
                        to: 'static/chunks/',
                    },
                    {
                        from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
                        to: 'static/chunks/app/@modal/(.)call/',
                    }, {
                        from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
                        to: 'static/chunks/app/@modal/(.)call/',
                    },
                    {
                        from: './models',
                        to: 'static/chunks/',
                    },
                    {
                        from: './models',
                        to: 'static/chunks/app/@modal/(.)call/',
                    },
                ],
            }),
        );

        return config;
    },

};


export default withBundleAnalyzer(withPWA(nextConfig));
