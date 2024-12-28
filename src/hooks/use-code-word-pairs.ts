import { useState } from 'react';
import { generateCodeWordPairs } from '@/core/code-word-pairs';
import { getCurrentDate } from '@/core/date';
import { getHashSHA256, saveRecoverySheetPDF } from '@/core/save';

let codeWordPairsSortedByCode: string[] = [];

export function useCodeWordPairs() {
  const [codeWordPairs, setCodeWordPairs] = useState<string[]>([]);
  const [hash, setHash] = useState('');
  const [date, setDate] = useState('');
  const [isSaved, setSaved] = useState<boolean | undefined>(undefined);

  const generate = () => {
    const result = generateCodeWordPairs();
    setDate(getCurrentDate());
    setCodeWordPairs(result);
    codeWordPairsSortedByCode = [...result].sort();
    setHash(getHashSHA256(codeWordPairsSortedByCode.join(' ')));
    setSaved(false);
  };

  const save = (previousNote?: string | null): void => {
    const note = window.prompt(
      'Add a note to the top of the file (optional, leave it blank for none):',
      typeof previousNote === 'string' ? previousNote : undefined
    );
    if (note !== null) {
      try {
        saveRecoverySheetPDF(date, note, hash, codeWordPairsSortedByCode);
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
          save(note);
          return;
        }
        console.error(e);
      }
      setSaved(true);
    }
  };

  return { codeWordPairs, hash, date, isSaved, generate, save };
}
