export const siteName = 'Talento São João de Todos | SuaMúsica';
export const description =
  'Os fãs poderão votar, torcer e escolher o seu participante favorito em uma  votação que vai do dia 04 de junho até o dia 18, quando vamos anunciar o grande vencedor durante a nossa live.';
export const canonical = 'https://talento.saojoaodetodos.com.br';
export const locale = 'pt-br';
export const type = 'website';
export const defaultImage = '/assets/ui/opengraph/cover.jpg';

const openGraph = {
  title: siteName,
  description: description,
  url: canonical,
  type: type,
  locale: locale,
  site_name: siteName,
  images: [
    {
      url: defaultImage,
      width: 1280,
      height: 720,
      alt: siteName,
    },
  ],
};

const twitter = {
  handle: '@saojoaodetodos',
  site: '@site',
  cardType: 'summary_large_image',
};

const pageConfig = {
  title: siteName,
  description: description,
  canonical: canonical,
  openGraph: openGraph,
};

export const SEO = {
  default: {
    ...openGraph,
    ...twitter,
  },
  page: {
    home: { ...pageConfig },
    share: { ...pageConfig, title: `Compartilhe | ${siteName}` },
    stories: { ...pageConfig, title: `Compartilhe nos stories | ${siteName}` },
  },
};

export default SEO;
