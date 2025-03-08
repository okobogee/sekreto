import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/components/app';
import { type CodeWordPair, generateCodeWordPairs } from '@/core/code-word-pairs';

const user = userEvent.setup();

vi.mock('@/core/code-word-pairs');

const mockGenerateCodeWordPairs = vi.mocked(generateCodeWordPairs);

const mockSaveRecoverySheetPDF = vi.fn<(...args: unknown[]) => void>();
vi.mock('@/core/save', async (importOriginal: () => Promise<Record<string, unknown>>) => ({
  ...(await importOriginal()),
  saveRecoverySheetPDF(...args: unknown[]) {
    mockSaveRecoverySheetPDF(...args);
  },
}));

const mockCodeWordPairs1: [CodeWordPair, CodeWordPair, CodeWordPair] = [
  { code: '32196', word: 'box' },
  { code: '43653', word: 'dinosaur' },
  { code: '06147', word: 'few' },
];

const mockCodeWordPairs2: [CodeWordPair, CodeWordPair, CodeWordPair] = [
  { code: '86056', word: 'armor' },
  { code: '25713', word: 'brass' },
  { code: '36168', word: 'coin' },
];

const mockCodeWordPairsSortedByCode2 = [mockCodeWordPairs2[1], mockCodeWordPairs2[2], mockCodeWordPairs2[0]];

const mockHash1 = '389e25da5b2e7753ac012ccc2895296bafb991091659e4625eaf61f0f71d8a6e';
const mockHash2 = '454410b0ff8e9e5ae949838646649c286b97dfc090ee3e8a77061cfd605b6664';

const mockDate1 = new Date(2024, 1, 10, 18, 0, 0);
const mockDate2 = new Date(2024, 1, 11, 19, 0, 0);

test('generates and saves code-word pairs correctly', async () => {
  vi.setSystemTime(mockDate1);
  mockGenerateCodeWordPairs.mockReturnValueOnce(mockCodeWordPairs1);

  render(<App />);
  const generateBtn = screen.getByTestId('generate-btn');
  await user.click(generateBtn);

  let codeWordPairs = screen.getByTestId('output').querySelectorAll('span');
  expect(codeWordPairs).toHaveLength(3);
  expect(codeWordPairs[0]).toHaveAttribute(
    'data-content',
    mockCodeWordPairs1[0].word.concat('-').concat(mockCodeWordPairs1[0].code)
  );
  expect(codeWordPairs[1]).toHaveAttribute(
    'data-content',
    mockCodeWordPairs1[1].word.concat('-').concat(mockCodeWordPairs1[1].code)
  );
  expect(codeWordPairs[2]).toHaveAttribute(
    'data-content',
    mockCodeWordPairs1[2].word.concat('-').concat(mockCodeWordPairs1[2].code)
  );
  expect(screen.getByTestId('date')).toHaveTextContent('February 10, 2024 18:00:00 UTC');
  expect(screen.getByTestId('hash')).toHaveTextContent(mockHash1);

  vi.stubGlobal('confirm', vi.fn().mockReturnValue(true));
  vi.setSystemTime(mockDate2);
  mockGenerateCodeWordPairs.mockReturnValueOnce(mockCodeWordPairs2);

  await user.click(generateBtn);

  codeWordPairs = screen.getByTestId('output').querySelectorAll('span');
  expect(codeWordPairs).toHaveLength(3);
  expect(codeWordPairs[0]).toHaveAttribute(
    'data-content',
    mockCodeWordPairs2[0].word.concat('-').concat(mockCodeWordPairs2[0].code)
  );
  expect(codeWordPairs[1]).toHaveAttribute(
    'data-content',
    mockCodeWordPairs2[1].word.concat('-').concat(mockCodeWordPairs2[1].code)
  );
  expect(codeWordPairs[2]).toHaveAttribute(
    'data-content',
    mockCodeWordPairs2[2].word.concat('-').concat(mockCodeWordPairs2[2].code)
  );
  expect(screen.getByTestId('date')).toHaveTextContent('February 11, 2024 19:00:00 UTC');
  expect(screen.getByTestId('hash')).toHaveTextContent(mockHash2);

  const note = 'some note';
  vi.stubGlobal('prompt', vi.fn().mockReturnValue(note));
  const saveBtn = screen.getByTestId('save-btn');
  await user.click(saveBtn);

  expect(mockSaveRecoverySheetPDF).toHaveBeenCalledTimes(1);
  expect(mockSaveRecoverySheetPDF).toHaveBeenCalledWith(
    'February 11, 2024 19:00:00 UTC',
    note,
    mockHash2,
    mockCodeWordPairsSortedByCode2
  );
});
