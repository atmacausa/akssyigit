// /** @type {import("next").NextConfig} */
// module.exports = {
//   experimental: {
//     serverActions: true,
//     appDir: true,
//     serverComponentsExternalPackages: ["mongoose"],
//   },
//   webpack(config) {
//     config.experiments = { ...config.experiments, topLevelAwait: true };
//     return config;
//   },
//   images: {
//     remotePatterns: [],
//   },
// };

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    serverActions: true,
    // appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
