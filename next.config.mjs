/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      { hostname: "ui-avatars.com", protocol: "https" },
      { hostname: "res.cloudinary.com", protocol: "http" },
    ],
  },
};

export default nextConfig;
