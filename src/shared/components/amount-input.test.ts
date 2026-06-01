import { hasValidAmount, sanitizeAmountValue } from '@/shared/utils/amount';

describe('amount input helpers', () => {
  it('keeps only numeric amount characters', () => {
    expect(sanitizeAmountValue('$ 0012abc,345')).toBe('12.34');
  });

  it('requires an amount greater than zero', () => {
    expect(hasValidAmount('0')).toBe(false);
    expect(hasValidAmount('0.01')).toBe(true);
  });
});
