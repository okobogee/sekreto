import styles from '@/styles/footer.module.css';
import { Button } from './button';
import { ButtonGroup } from './button-group';
import { Info as InfoIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from 'react-feather';

interface FooterProps {
  date: string;
  hash: string;
  isGenerated: boolean;
  onGenerateClick: () => void;
  onSaveClick: () => void;
  onZoomOutClick: () => void;
  onZoomInClick: () => void;
}

interface InfoProps {
  date: string;
  hash: string;
}

function showHashInfo() {
  window.alert(
    [
      'This is the hash of the code-word pairs output, but sorted by code instead of alphabetically by word.',
      'You can find the correctly sorted output that matches this hash in the file produced by clicking on "Save."',
      'The purpose of this hash is for you to easily identify the output after it has been saved.',
    ].join('\n')
  );
}

function Info({ date, hash }: InfoProps) {
  return (
    <div className={styles.info}>
      <div>
        <span className={styles.label}>Date:</span>
        <span className={styles.value} data-testid="date">
          {date}
        </span>
      </div>
      <div>
        <span className={styles.label}>SHA256:</span>
        <span className={styles.value} data-testid="hash">
          {hash}
          <Button variant="plain" onClick={showHashInfo} className={styles.infoButton} title="Show more info">
            <InfoIcon size={12} />
          </Button>
        </span>
      </div>
    </div>
  );
}

export function Footer({
  date,
  hash,
  isGenerated,
  onGenerateClick,
  onSaveClick,
  onZoomOutClick,
  onZoomInClick,
}: FooterProps) {
  return (
    <footer className={styles.root}>
      <div className={styles.buttons}>
        <Button onClick={onGenerateClick} data-testid="generate-btn">
          Generate
        </Button>
        {isGenerated && (
          <>
            <Button variant="secondary" onClick={onSaveClick} data-testid="save-btn">
              Save
            </Button>
            <ButtonGroup>
              <Button variant="secondary" title="Zoom out" aria-label="Zoom Out" onClick={onZoomOutClick}>
                <ZoomOutIcon className={styles.zoomIcon} size={18} />
              </Button>
              <Button variant="secondary" title="Zoom in" aria-label="Zoom In" onClick={onZoomInClick}>
                <ZoomInIcon className={styles.zoomIcon} size={18} />
              </Button>
            </ButtonGroup>
          </>
        )}
      </div>
      {isGenerated && <Info date={date} hash={hash} />}
    </footer>
  );
}
