/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH,
  output: "export",
  env: {
    myBasePath: process.env.BASE_PATH,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: `${process.env.BASE_PATH}/opening`,
        permanent: true, // or false if the redirect is temporary
      },
    ];
  },
};

module.exports = nextConfig;
