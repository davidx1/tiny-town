/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.basePath,
  output: "export",
  async redirects() {
    return [
      {
        source: "/",
        destination: `${process.env.basePath}/opening`,
        permanent: true, // or false if the redirect is temporary
      },
    ];
  },
};

module.exports = nextConfig;
