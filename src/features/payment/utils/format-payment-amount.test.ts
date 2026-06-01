import { formatPaymentAmount } from './format-payment-amount';

describe('formatPaymentAmount', () => {
  it('formats the payment amount with the selected fiat symbol', () => {
    expect(formatPaymentAmount(56, 'EUR')).toBe('56,00 €');
  });
});
