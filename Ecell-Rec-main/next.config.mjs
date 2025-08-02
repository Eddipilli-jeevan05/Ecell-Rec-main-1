/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["acertinity ui.com", "images.unsplash.com", "assets.aceternity.com","picsum.photos","avatar.vercel.sh","i.ibb.co"]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
