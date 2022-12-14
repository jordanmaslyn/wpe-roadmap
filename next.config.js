const nextConfig = {
  // Use the absolute URL if one is set.
  assetPrefix: process.env.ASSET_URL_PREFIX ?? undefined,
  async rewrites() {
    return [
      {
        source: "/wp-admin/:path*",
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/:path*`, // Matched parameters can be used in the destination
      },
      {
        source: "/wp-content/:path*",
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/:path*`, // Matched parameters can be used in the destination
      },
    ];
  },
};

module.exports = nextConfig;
