/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '4sales.bg',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'coreapps.eu',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mgyjouymbqlufcczmoru.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
