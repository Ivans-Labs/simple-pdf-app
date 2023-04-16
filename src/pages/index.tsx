import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { DefaultSeo } from 'next-seo';

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

const Home: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <Head>
        <title>My PDF App</title>
        <meta name="description" content="A collection of PDF tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultSeo {...SEO} />

      <header className={styles.header}>
        <h1>Transform Your PDFs</h1>
      </header>

      <div className={styles.githubLink}>
        <a
          href="https://github.com/Sudo-Ivan/simple-pdf-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github white" aria-hidden="true"></i>
        </a>
      </div>

      <main className={styles.main}>
        <p className={styles.intro}>
          My PDF Tools is a collection of tools to help you manage and edit your
          PDF files.
        </p>

        <div className={styles.toolsContainer}>
          <div className={styles.toolBox}>
            <div className={styles.toolIcon} />
            <h2>PDF Merger</h2>
            <p className={styles.description}>
              Merge multiple PDF files into a single file.
            </p>
            <Link href="/pdfmerger" legacyBehavior>
              <a className={styles.toolButton}>Merge PDF</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
