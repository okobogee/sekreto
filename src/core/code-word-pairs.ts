import { englishWords } from '@/core/words';
import { getRandomCode } from '@/core/random';

function getUniqueRandomCode(codes: Set<string>): string {
  const code = getRandomCode();
  return codes.has(code) ? getUniqueRandomCode(codes) : code;
}

export interface CodeWordPair {
  code: string;
  word: string;
}

export function generateCodeWordPairs(): CodeWordPair[] {
  const codes = new Set<string>();
  return englishWords.map((word: string) => {
    const code = getUniqueRandomCode(codes);
    codes.add(code);
    return { code, word };
  });
}
