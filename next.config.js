/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'pl',
    localeDetection: false,
    domains: [
      {
        domain: 'burgerfestival.cz',
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
    APP_DOMAIN: process.env.APP_DOMAIN,
    MAILERSEND_TOKEN: process.env.MAILERSEND_TOKEN,
  },
  async rewrites() {
    return [
      {
        source: '/festiwale',
        destination: '/festivaly',
      },
      {
        source: '/clanek',
        destination: '/blog',
      },
      {
        source: '/rejestracja',
        destination: '/registrace',
      },
      {
        source: '/fanshop',
        destination: '/obchod',
      },
      {
        source: '/galeria-zdjec',
        destination: '/fotogalerie',
      },
      {
        source: '/partnerzy',
        destination: '/partneri',
      },
      {
        source: '/kontakty',
        destination: '/kontakt',
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
