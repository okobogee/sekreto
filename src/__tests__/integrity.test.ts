import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

test('project bip-39 words file has the correct hash', async () => {
  // SHA256 of https://github.com/bitcoin/bips/blob/70d9b07ab80ab3c267ece48f74e4e2250226d0cc/bip-0039/english.txt
  const expectedSHA256 = '2f5eed53a4727b4bf8880d8f3f199efc90e58503646d9ff8eff3a2ed3b24dbda';

  const actualSHA256 = await getFileSHA256(path.join('src', 'core', 'words', 'english.txt'));

  expect(actualSHA256).toEqual(expectedSHA256);
});

function getFileSHA256(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(file);
    stream.on('data', (buff) => {
      hash.update(buff as string, 'utf8');
    });
    stream.on('end', () => {
      const hashCheckSum = hash.digest('hex');
      resolve(hashCheckSum);
    });
    stream.on('error', (error) => {
      reject(error);
    });
  });
}
