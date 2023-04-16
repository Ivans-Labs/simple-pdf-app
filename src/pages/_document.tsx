import { DefaultSeo } from 'next-seo';
import { Html, Head, Main, NextScript } from 'next/document';

const SEO = {
  title: 'A Very Simple PDF App',
  description: 'PDF App 100% Free & Open-Source.',
  openGraph: {
    title: 'A Very Simple PDF App',
    description: 'PDF App 100% Free & Open-Source.',
    url: 'https://simplepdf.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://cdn.statically.io/gh/Sudo-Ivan/MyWebsite-Assets/main/images/website/pdfapphomepage.png',
        width: 1200,
        height: 630,
        alt: 'A Very Simple PDF App Preview',
      },
    ],
  },
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <DefaultSeo {...SEO} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
