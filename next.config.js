/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    localeDetection: false,
    domains: [
      {
        domain: 'burgerstreetfestival.cz',
        defaultLocale: 'en',
      },
      {
        domain: 'burgerfestival.pl',
        defaultLocale: 'pl',
      },
    ],
  },
  env: {
    APP_API: process.env.APP_API,
    APP_DOMAIN_CZ: process.env.APP_DOMAIN_CZ,
    APP_DOMAIN_PL: process.env.APP_DOMAIN_PL,
    MAILERSEND_TOKEN: process.env.MAILERSEND_TOKEN,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap/index.xml',
        destination: 'https://burger-strapi-demo.hardart.cz/sitemap/index.xml',
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: ['burger-strapi.hardart.cz', 'burger-strapi-demo.hardart.cz', 'localhost'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
