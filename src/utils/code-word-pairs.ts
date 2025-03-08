import { type CodeWordPair } from '@/core/code-word-pairs';

export function sortCodeWordPairByCode(a: CodeWordPair, b: CodeWordPair) {
  if (a.code < b.code) return -1;
  if (a.code > b.code) return 1;
  return 0;
}

export function adaptCodeWordPairToTextCodeFirst(codeWordPair: CodeWordPair) {
  return codeWordPair.code.concat('-').concat(codeWordPair.word);
}

export function adaptCodeWordPairToTextWordFirst(codeWordPair: CodeWordPair) {
  return codeWordPair.word.concat('-').concat(codeWordPair.code);
}
