const cspHeader = `
    default-src 'self' fonts.googleapis.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    poweredByHeader: false,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                ],

            }
        ];
    },
    // output: "export",
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    images: {
        // unoptimized: true,
        domains: [],
    },
    async redirects() {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: true,
            },
            {
                source: "/index",
                destination: "/",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
