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
      'This is the hash of the code-word pairs seen on screen but sorted by code. For example: "0009-history 0012-autumn".',
      'The pairs sorted this way can be found in your Recovery Sheet, which is created by clicking on "Save".',
      "You can use this hash to uniquely identify your code-word pairs and verify your Recovery Sheet's content integrity.",
    ].join('\n')
  );
}

function Info({ date, hash }: InfoProps) {
  return (
    <div className={styles.info}>
      <div>
        <span className={styles.label}>SHA256:</span>
        <span className={styles.value} data-testid="hash">
          {hash}
        </span>
        <Button variant="plain" onClick={showHashInfo} className={styles.sha256InfoButton} title="Show more info">
          <InfoIcon className={styles.infoIcon} />
        </Button>
      </div>
      <div>
        <span className={styles.label}>Date:</span>
        <span className={styles.value} data-testid="date">
          {date}
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
                <ZoomOutIcon className={styles.zoomIcon} />
              </Button>
              <Button variant="secondary" title="Zoom in" aria-label="Zoom In" onClick={onZoomInClick}>
                <ZoomInIcon className={styles.zoomIcon} />
              </Button>
            </ButtonGroup>
          </>
        )}
      </div>
      {isGenerated && <Info date={date} hash={hash} />}
    </footer>
  );
}
