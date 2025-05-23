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
      // {
      //   source: '/festiwale',
      //   destination: '/festivaly',
      // },
      // {
      //   source: '/czlonek/:slug',
      //   destination: '/clanek/:slug',
      // },
      // {
      //   source: '/rejestracja',
      //   destination: '/registrace',
      // },
      // {
      //   source: '/fanshop',
      //   destination: '/obchod',
      // },
      // {
      //   source: '/galeria-zdjec',
      //   destination: '/fotogalerie',
      // },
      // {
      //   source: '/partnerzy',
      //   destination: '/partneri',
      // },
      // {
      //   source: '/kontakty',
      //   destination: '/kontakt',
      // },
      {
        source: '/sitemap/index.xml',
        destination: 'https://burger-strapi.hardart.cz/sitemap/index.xml',
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
    domains: ['burger-strapi.hardart.cz', 'localhost'],
  },
}

module.exports = nextConfig
