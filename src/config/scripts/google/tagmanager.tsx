export const id = process.env.SUAMUSICA_SJDT_GOOGLE_TAG_MANAGER_ID || '';

export const header = (): JSX.Element => (
  <>
    {/* Google Tag Manager */}
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');`,
      }}
    />
    {/* End Google Tag Manager */}
  </>
);

export const body = (): JSX.Element => (
  <>
    {/* Google Tag Manager (noscript) */}
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
    {/* End Google Tag Manager (noscript) */}
  </>
);
