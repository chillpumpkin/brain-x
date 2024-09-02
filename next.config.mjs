/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'random-image-pepebigotes.vercel.app',
            port: '',
            pathname: '/api/random-image/**', // Use wildcard to match any image served from this path
          },
        ],
      },
};

export default nextConfig;
