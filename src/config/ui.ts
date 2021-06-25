import { siteName } from '@/config/seo';

const path = {
  global: {
    root: '/assets/ui',
    fav: '/assets/ui/fav',
    openGraph: '/assets/ui/opengraph',
  },
  components: {
    root: '/assets/ui/components',
    layout: '/assets/ui/components/layout',
    header: '/assets/ui/components/header',
    avatar: '/assets/ui/components/avatar',
    footer: '/assets/ui/components/footer',
  },
};

export const global = {
  favicon: '/assets/ui/fav/favicon.webp',
  openGraph: {
    cover: `${path.global.openGraph}/cover.webp`,
  },
  logo: {
    src: '/assets/img/logo/logo.svg',
    alt: { siteName },
    width: 162,
    height: 36,
  },
};

export const header = {
  talento: {
    src: `${path.components.header}/talento.webp`,
    alt: 'São João de Todos',
  },
  logos: {
    src: `${path.components.header}/logos.webp`,
    alt: 'Mídia',
  },
};

export const avatar = {
  example: {
    src: `${path.components.avatar}/example.jpg`,
    alt: 'São João de Todos',
  },
};

export const layout = {
  background: {
    src: `${path.components.layout}/background.jpg`,
  },
};

export const footer = {
  sponsors: {
    src: `${path.components.footer}/sponsors.png`,
    alt: 'Patrocinadores',
  },
  hope: {
    src: `${path.components.footer}/hope.png`,
    alt: 'Corda',
  },
  background: {
    src: `${path.components.footer}/background-doodle.jpg`,
    alt: 'Tolha de mesa',
  },
};
