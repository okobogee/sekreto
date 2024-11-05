import { useCodeWordPairs } from '@/hooks/use-code-word-pairs';
import '@/styles/app.css';
import { useState } from 'react';
import { usePreventTextSearch } from '@/hooks/use-prevent-text-search';
import { Header } from './header';
import { CodeWordPairs } from './code-word-pairs';
import { Footer } from './footer';

function confirmDelete() {
  return window.confirm(
    'Delete the current list of code-word pairs and generate a new one? This action is irreversible.'
  );
}

export function App() {
  const { codeWordPairs, hash, date, save, generate } = useCodeWordPairs();
  const [fontSize, setFontSize] = useState(100);
  const [isPrivacyTipVisible, setPrivacyTipVisible] = useState(false);

  usePreventTextSearch();

  const handleGenerateClick = () => {
    if (codeWordPairs.length) {
      if (!confirmDelete()) return;
    } else {
      setPrivacyTipVisible(true);
    }
    generate();
  };

  const handleZoomOutClick = () => {
    setFontSize((it) => it - 10);
  };

  const handleZoomInClick = () => {
    setFontSize((it) => it + 10);
  };

  const handlePrivacyTipClick = () => {
    setPrivacyTipVisible(false);
  };

  return (
    <>
      <Header />
      <CodeWordPairs
        codeWordPairs={codeWordPairs}
        fontSize={fontSize}
        isPrivacyTipVisible={isPrivacyTipVisible}
        onPrivacyTipClick={handlePrivacyTipClick}
      />
      <Footer
        date={date}
        hash={hash}
        isGenerated={!!codeWordPairs.length}
        onGenerateClick={handleGenerateClick}
        onSaveClick={save}
        onZoomOutClick={handleZoomOutClick}
        onZoomInClick={handleZoomInClick}
      />
    </>
  );
}
