import englishWordsTxt from './english.txt?raw';

export const englishWords = [...new Set(englishWordsTxt.split('\n').filter(Boolean))];
