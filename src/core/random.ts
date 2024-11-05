/**
 * Based on the function random implemented by `OpenWireless`:
 * {@link https://github.com/EFForg/OpenWireless/blob/8075811b59bab6e4f4c79879e4787b24cdbb260d/app/js/diceware.js Diceware.prototype.random}
 */
export function getRandomCode(): string {
  const min = 0;
  const max = 99999;
  let rval = 0;
  const range = max - min;

  const bitsNeeded = Math.ceil(Math.log2(range));
  if (bitsNeeded > 53) throw new Error('Unable to generate numbers larger than 53 bits');

  const bytesNeeded = Math.ceil(bitsNeeded / 8);
  const mask = 2 ** bitsNeeded - 1;

  const byteArray = new Uint8Array(bytesNeeded);
  window.crypto.getRandomValues(byteArray);

  let p = (bytesNeeded - 1) * 8;
  for (let i = 0; i < bytesNeeded; i++) {
    const byte = byteArray[i];
    if (byte === undefined) throw Error(`Byte at index ${String(i)} is undefined`);
    rval += byte * 2 ** p;
    p -= 8;
  }

  rval &= mask;

  if (rval >= range) return getRandomCode();

  return (min + rval).toString().padStart(5, '0');
}
