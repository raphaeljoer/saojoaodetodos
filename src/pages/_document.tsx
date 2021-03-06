import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import theme from '@/styles/Global/theme';
import * as tagmanager from '@/config/scripts/google/tagmanager';
import * as ui from '@/config/ui';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {tagmanager.header}
          <link rel="icon" type="image/png" href={ui.global.favicon} />
          <link rel="shortcut icon" href={ui.global.favicon} />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Odibee+Sans&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {tagmanager.body}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </body>
      </Html>
    );
  }
}
