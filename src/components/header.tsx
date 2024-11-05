import styles from '@/styles/header.module.css';
import { GitHub as GitHubIcon } from 'react-feather';

export function Header() {
  return (
    <header className={styles.root}>
      <h1>Sekreto</h1>
      <div className={styles.appVersion}>{__APP_VERSION__}</div>
      <a
        href="https://github.com/okobogee/sekreto"
        target="_blank"
        rel="noopener noreferrer"
        title="Go to GitHub page"
        className={styles.link}
      >
        <GitHubIcon size={16} />
      </a>
    </header>
  );
}
