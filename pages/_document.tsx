import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="5Fn3rPvNO4oGrqunk4VWGakt-OyxNzesnMndHzC6B8k"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Quran 217 – Listen and Read the Quran" />
        <meta
          property="og:description"
          content="Quran 217 is a website where you can read or listen to the Quran, explore Ayah explanations, and choose from many reciters."
        />
        <meta property="og:url" content="https://quran-217.netlify.app" />
        <meta
          property="og:image"
          content="https://quran-217.netlify.app/images/Website_Image.png"
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Quran 217",
              "url": "https://quran-217.netlify.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://quran-217.netlify.app/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Quran 217",
              "url": "https://quran-217.netlify.app",
              "logo": "https://quran-217.netlify.app/images/Website_Image.png"
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
