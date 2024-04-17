/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH,
  output: "export",
  env: {
    myBasePath: process.env.BASE_PATH,
  },
};

module.exports = nextConfig;
