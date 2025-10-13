/** @type {import('next').NextConfig} */
const nextConfig = {

  // Add this images block
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '**',
      },
      // ADD THIS NEW BLOCK
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      
    ],
  },
  typescript: {
    // Optional: ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds with ESLint warnings
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;