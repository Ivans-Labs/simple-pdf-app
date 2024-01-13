import styles from '@/styles/home.module.css';
import { DefaultSeo } from 'next-seo';
import Link from 'next/link';

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

const Home = () => {
  return (
    <div className={styles.appContainer}>
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
            <Link href="/pdfmerge">
              <span className={styles.toolButton}>Merge PDF</span>
            </Link>
          </div>
          <div className={styles.toolBox}>
            <div className={styles.toolIcon} />
            <h2>PDF Splitter</h2>
            <p className={styles.description}>
              Split a PDF file into multiple files.
            </p>
            <Link href="/pdfsplitter">
              <span className={styles.toolButton}>Split PDF</span>
            </Link>
          </div>
          <div className={styles.toolBox}>
            <div className={styles.toolIcon} />
            <h2>PDF Compressor</h2>
            <p className={styles.description}>
              Compress the size of a PDF file.
            </p>
            <Link href="/pdfcompressor">
              <span className={styles.toolButton}>Compress PDF</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
