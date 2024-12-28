import styles from '@/styles/header.module.css';
import { GitHub as GitHubIcon, Download as DownloadIcon } from 'react-feather';

const isOnline = window.location.protocol !== 'file:';

export function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.title}>
        <h1>Sekreto</h1>
        <div className={styles.version}>{__APP_VERSION__}</div>
      </div>
      <div className={styles.menu}>
        {isOnline ? (
          <a
            href="./index.html"
            className={styles.link}
            download={`sekreto-${__APP_VERSION__}.html`}
            title="Download app for offline use"
          >
            <DownloadIcon className={styles.icon} />
          </a>
        ) : null}
        <a
          href="https://github.com/okobogee/sekreto"
          target="_blank"
          rel="noopener noreferrer"
          title="Go to GitHub page"
          className={styles.link}
        >
          <GitHubIcon className={styles.icon} />
        </a>
      </div>
    </header>
  );
}
