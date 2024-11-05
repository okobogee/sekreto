import { getRandomCode } from '@/core/random';

describe('when number has less than 5 digits', () => {
  it('adds 0s at the start', () => {
    const randomNumber = getRandomCode();

    expect(randomNumber).toHaveLength(5);
  });
});
