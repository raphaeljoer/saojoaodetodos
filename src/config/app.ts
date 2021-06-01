import { siteName } from './seo';

const path = {
  components: {
    root: "/assets/ui/components/",
    layout: "/assets/ui/components/Layout",
    header: "/assets/ui/components/Header",
    avatar: "/assets/ui/components/Avatar",
    footer: "/assets/ui/components/Footer",
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
  color: "#FF6700",
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
    favicon: "/assets/ui/fav/favicon.png",
    logo: {
      src: "/assets/img/logo/logo.svg",
      alt: { siteName },
      width: 162,
      height: 36,
    },
  },
  header: {
    image: {
      src: `${path.components.header}/image.png`,
      alt: "São João de Todos"
    }
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