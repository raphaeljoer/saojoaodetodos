import { siteName } from './seo';

const path = {
  global: {
    root: "/assets/ui",
    fav: "/assets/ui/fav",
    openGraph: "/assets/ui/opengraph"
  },
  components: {
    root: "/assets/ui/components",
    layout: "/assets/ui/components/layout",
    header: "/assets/ui/components/header",
    avatar: "/assets/ui/components/avatar",
    footer: "/assets/ui/components/footer",
  }
}

export const next = {
  revalidate: {
    oneMinute: 60,
    fiveMinutes: 300,
    halfHour: 1800,
    hour: 3600,
    day: 86400
  }
};

export const nextNprogress = {
  color: "#e53e3e",
  startPosition: 0.4,
  stopDelayMs: 200,
  height: 4
}

export const zIndex = {
  lowest: 1,
  lower: 10,
  low: 100,
  medium: 1000,
  high: 10000,
  higher: 100000,
  highest: 1000000
};

export const ui = {
  global: {
    favicon: "/assets/ui/fav/favicon.webp",
    openGraph: {
      cover: `${path.global.openGraph}/cover.webp`
    },
    logo: {
      src: "/assets/img/logo/logo.svg",
      alt: { siteName },
      width: 162,
      height: 36,
    },
  },
  header: {
    talento: {
      src: `${path.components.header}/talento.webp`,
      alt: "São João de Todos"
    },
    logos: {
      src: `${path.components.header}/logos.webp`,
      alt: "Mídia"
    },
  },
  avatar: {
    example: {
      src: `${path.components.avatar}/example.jpg`,
      alt: "São João de Todos"
    }
  },
  layout: {
    background: {
      src: `${path.components.layout}/background.jpg`
    },
  },
  footer: {
    sponsors: {
      src: `${path.components.footer}/sponsors.png`,
      alt: "Patrocinadores"
    },
    hope: {
      src: `${path.components.footer}/hope.png`,
      alt: "Corda"
    },
    background: {
      src: `${path.components.footer}/background-doodle.jpg`,
      alt: "Tolha de mesa"
    }
  }
};