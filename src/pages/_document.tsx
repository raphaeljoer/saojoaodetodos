import {ColorModeScript} from "@chakra-ui/react"
import NextDocument, {Head, Html, Main, NextScript} from "next/document"
import theme from "@/styles/theme";
import { ui } from "@/config/app";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href={ui.global.favicon}/>
          <link rel="shortcut icon" href={ui.global.favicon}/>
        </Head>
        <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <Main/>
        <NextScript/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        </body>
      </Html>
    )
  }
}
