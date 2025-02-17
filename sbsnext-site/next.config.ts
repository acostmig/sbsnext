import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const withMDX = createMDX({
  
})

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};



export default withMDX(nextConfig);