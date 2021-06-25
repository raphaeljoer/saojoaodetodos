module.exports = {
  env: {
    SUAMUSICA_SJDT_RECAPTCHA_V3_SITE_KEY:
      process.env.SUAMUSICA_SJDT_RECAPTCHA_V3_SITE_KEY,
    SUAMUSICA_SJDT_RECAPTCHA_V3_SECRET_KEY:
      process.env.SUAMUSICA_SJDT_RECAPTCHA_V3_SECRET_KEY,
    SUAMUSICA_SJDT_MONGODB_URI: process.env.SUAMUSICA_SJDT_MONGODB_URI,
  },
  images: {
    path: '/_next/image',
    loader: 'default',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['media.graphcms.com'],
  },
};
