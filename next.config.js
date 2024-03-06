/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/tiny-town",
  output: "export",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/opening",
        permanent: true, // or false if the redirect is temporary
      },
    ];
  },
};

module.exports = nextConfig;
