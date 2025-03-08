import { useMemo } from 'react';
import styles from '@/styles/code-word-pairs.module.css';
import { Button } from './button';
import { type CodeWordPair } from '@/core/code-word-pairs';
import { adaptCodeWordPairToTextWordFirst } from '@/utils/code-word-pairs';

interface CodeWordPairsProps {
  codeWordPairs: CodeWordPair[];
  fontSize: number;
  isPrivacyTipVisible: boolean;
  onPrivacyTipClick: () => void;
}

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export function CodeWordPairs({ codeWordPairs, fontSize, isPrivacyTipVisible, onPrivacyTipClick }: CodeWordPairsProps) {
  const codeWordPairsElement = useMemo(
    () => (
      <>
        {codeWordPairs.map((codeWordPair) => (
          <span
            data-content={adaptCodeWordPairToTextWordFirst(codeWordPair)}
            key={codeWordPair.code}
            className={styles.codeWordPair}
          />
        ))}
      </>
    ),
    [codeWordPairs]
  );

  return (
    <div className={styles.root}>
      <div className={styles.outerWrapper} data-testid="output">
        <div className={styles.innerWrapper} style={{ fontSize: `${String(fontSize)}%` }} tabIndex={0}>
          {codeWordPairsElement}
        </div>
        <div className={styles.outerWrapperFocusBorder}></div>
        {isPrivacyTipVisible && (
          <Button variant="plain" className={styles.message} onClick={onPrivacyTipClick}>
            {isTouchDevice ? 'Text selection is disabled. ' : 'Mouse cursor and text selection are disabled. '}
            Zoom in/out for enhanced privacy. Click here to dismiss this message.
          </Button>
        )}
      </div>
    </div>
  );
}
