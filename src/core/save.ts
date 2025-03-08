import sha256 from 'crypto-js/sha256';
import { jsPDF as JsPDF } from 'jspdf';
import { type CodeWordPair } from './code-word-pairs';
import { adaptCodeWordPairToTextCodeFirst } from '@/utils/code-word-pairs';

export function getHashSHA256(content: string) {
  const hashDigest = sha256(content);
  return hashDigest.toString();
}

interface PrintCodeWordPairs {
  doc: JsPDF;
  codeWordPairs: CodeWordPair[];
  codeWordPairWidth: number;
  initialY: number;
  marginY: number;
  marginX: number;
  linHeight: number;
}

function writeCodeWordPairs({
  doc,
  codeWordPairs,
  codeWordPairWidth,
  initialY,
  marginY,
  marginX,
  linHeight,
}: PrintCodeWordPairs) {
  let x = marginX;
  let y = initialY;

  for (let i = 0; i < codeWordPairs.length; i++) {
    if (x + codeWordPairWidth > doc.internal.pageSize.width - marginX) {
      x = marginX;
      y += linHeight;
    }
    if (y > doc.internal.pageSize.height - marginY) {
      doc.addPage();
      y = marginY;
    }
    const codeWordPair = codeWordPairs[i];
    if (codeWordPair === undefined) throw Error(`Unable to retrieve code from index ${String(i)}`);
    let text = adaptCodeWordPairToTextCodeFirst(codeWordPair);
    if (i !== codeWordPairs.length - 1) text = text.concat(' ');
    doc.text(text, x, y);
    x += codeWordPairWidth;
  }
}

export function saveRecoverySheetPDF(
  date: string,
  note: string,
  hash: string,
  codeWordPairsSortedByCode: CodeWordPair[]
) {
  const doc = new JsPDF('p', 'mm', 'a4');
  const marginX = 6.35;
  const marginY = 6.35;

  const headerFontSize = 6.5;
  const headerLineHeight = 2.7;

  const bodyFontSize = 5.46;
  const bodyLineHeight = 1.77;
  const codeWordPairWidth = 15.17;

  doc.setFont('helvetica').setFontSize(headerFontSize);

  const lineWithNote = `Sekreto ${__APP_VERSION__} Recovery Sheet - ${date} ${note ? `- ${note}` : ''}`;
  if (doc.getTextWidth(lineWithNote) > 210 - marginX * 2) {
    throw new Error('Your note contains too many characters. Please make it shorter.');
  }

  doc
    .text(lineWithNote, marginX, marginY)
    .text(
      `SHA256: ${hash} (of content below the line: hyphenated code-word pairs separated by single space; no line breaks)`,
      marginX,
      marginY + headerLineHeight
    )
    .line(
      marginX,
      marginY + headerLineHeight * 1.3,
      doc.internal.pageSize.width - marginX,
      marginY + headerLineHeight * 1.3
    )
    .setFontSize(bodyFontSize);

  writeCodeWordPairs({
    doc,
    codeWordPairs: codeWordPairsSortedByCode,
    codeWordPairWidth,
    initialY: marginY + headerLineHeight * 2.1,
    marginY,
    marginX,
    linHeight: bodyLineHeight,
  });

  doc.save(`sekreto-${hash.substring(0, 7)}.pdf`);
}
