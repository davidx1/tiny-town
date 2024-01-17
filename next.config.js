/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/town",
        permanent: true, // or false if the redirect is temporary
      },
    ];
  },
};

module.exports = nextConfig;
