
export const siteName = "Talento São João de Todos | SuaMúsica";
export const description = "Entregando confiança, credibilidade e inovação por todo nordeste";
export const canonical = "https://saojoaodetodos.com.br";
export const locale = "pt-br";
export const type = "website";
export const defaultImage = "/assets/img/opengraph/cover-opengraph.jpg";

const openGraph = {
  title: siteName,
  description: description,
  url: canonical,
  type: type,
  locale: locale,
  site_name: siteName,
  images: [{
    url: defaultImage,
    width: 1280,
    height: 720,
    alt: siteName
  }]
};

const twitter = {
  handle: "@saojoaodetodos",
  site: "@site",
  cardType: "summary_large_image",
}

const pageConfig = {
  title: siteName,
  description: description,
  canonical: canonical,
  openGraph: openGraph
}

export const SEO = {
  default: {
    ...openGraph,
    ...twitter
  },
  page: {
    home: { ...pageConfig },
    share: { ...pageConfig, title: `Share | ${siteName}`},
  },
}

export default SEO;
