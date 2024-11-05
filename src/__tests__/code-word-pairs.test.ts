import { generateCodeWordPairs } from '@/core/code-word-pairs';
import { getRandomCode } from '@/core/random';

vi.mock('@/core/random');

const mockGetRandomCode = vi.mocked(getRandomCode);

const mockGetEnglishWords = vi.fn<() => string[]>();
vi.mock('@/core/words', () => ({
  get englishWords() {
    return mockGetEnglishWords();
  },
}));

describe('when a code is already associated with a word', () => {
  it('keeps generating a new code until an unassociated one is obtained', () => {
    mockGetEnglishWords.mockReturnValueOnce(['access', 'chapter', 'easy']);
    mockGetRandomCode
      .mockReturnValueOnce('00001')
      .mockReturnValueOnce('00002')
      .mockReturnValueOnce('00002')
      .mockReturnValueOnce('00001')
      .mockReturnValueOnce('00003');

    const codes = generateCodeWordPairs();

    expect(codes).toEqual(['00001-access', '00002-chapter', '00003-easy']);
  });
});
