import styles from '@/styles/header.module.css';
import { GitHub as GitHubIcon, Download as DownloadIcon } from 'react-feather';

const isOnline = window.location.protocol !== 'file:';

export function Header() {
  return (
    <header className={styles.root}>
      <h1>Sekreto</h1>
      <div className={styles.appVersion}>{__APP_VERSION__}</div>
      <div className={styles.menu}>
        {isOnline ? (
          <a
            href="./index.html"
            className={styles.link}
            download={`sekreto-${__APP_VERSION__}.html`}
            title="Download app for offline use"
          >
            <DownloadIcon size={18} />
          </a>
        ) : null}
        <a
          href="https://github.com/okobogee/sekreto"
          target="_blank"
          rel="noopener noreferrer"
          title="Go to GitHub page"
          className={styles.link}
        >
          <GitHubIcon size={18} />
        </a>
      </div>
    </header>
  );
}
