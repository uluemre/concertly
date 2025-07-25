/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        TICKETMASTER_API_KEY: process.env.TICKETMASTER_API_KEY,
    },
};

export default nextConfig;
