import { useState } from 'react';
import { type CodeWordPair, generateCodeWordPairs } from '@/core/code-word-pairs';
import { getCurrentDate } from '@/core/date';
import { getHashSHA256, saveRecoverySheetPDF } from '@/core/save';
import { adaptCodeWordPairToTextCodeFirst, sortCodeWordPairByCode } from '@/utils/code-word-pairs';

let codeWordPairsSortedByCode: CodeWordPair[] = [];

export function useCodeWordPairs() {
  const [codeWordPairs, setCodeWordPairs] = useState<CodeWordPair[]>([]);
  const [hash, setHash] = useState('');
  const [date, setDate] = useState('');
  const [isSaved, setSaved] = useState<boolean | undefined>(undefined);

  const generate = () => {
    const result = generateCodeWordPairs();
    setDate(getCurrentDate());
    setCodeWordPairs(result);
    codeWordPairsSortedByCode = [...result].sort(sortCodeWordPairByCode);
    setHash(getHashSHA256(codeWordPairsSortedByCode.map(adaptCodeWordPairToTextCodeFirst).join(' ')));
    setSaved(false);
  };

  const save = (previousNote?: string | null): void => {
    const note = window.prompt(
      'Add a note to the top of the file (optional: leave it blank and click OK for none)',
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
