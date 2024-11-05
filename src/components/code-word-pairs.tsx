import { useMemo } from 'react';
import styles from '@/styles/code-word-pairs.module.css';
import { Button } from './button';

interface CodeWordPairsProps {
  codeWordPairs: string[];
  fontSize: number;
  isPrivacyTipVisible: boolean;
  onPrivacyTipClick: () => void;
}

export function CodeWordPairs({ codeWordPairs, fontSize, isPrivacyTipVisible, onPrivacyTipClick }: CodeWordPairsProps) {
  const codeWordPairsElement = useMemo(
    () => (
      <>
        {codeWordPairs.map((codeWordPair) => (
          <span data-content={codeWordPair} key={codeWordPair} className={styles.codeWordPair} />
        ))}
      </>
    ),
    [codeWordPairs]
  );

  return (
    <div className={styles.root}>
      <div className={styles.wrapper1} data-testid="output">
        <div className={styles.wrapper2} style={{ fontSize: `${String(fontSize)}%` }}>
          {codeWordPairsElement}
        </div>
        {isPrivacyTipVisible && (
          <Button variant="plain" className={styles.message} onClick={onPrivacyTipClick}>
            Mouse cursor and text selection are disabled. Zoom in/out for enhanced privacy. Click here to dismiss this
            message.
          </Button>
        )}
      </div>
    </div>
  );
}
