/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: 'C:\\\\Users\\\\geetc\\\\OneDrive\\\\Desktop\\\\Projects\\\\deploy\\\\smart-home-blog',

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
};

export default nextConfig;