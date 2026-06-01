import { renderWithProviders } from '@/shared/test/render-with-providers';

import { usePaymentStatusSocket } from '../hooks/use-payment-status-socket';
import { PaymentStatusListener } from './payment-status-listener';

jest.mock('../hooks/use-payment-status-socket', () => ({
  usePaymentStatusSocket: jest.fn(),
}));

describe('PaymentStatusListener', () => {
  it('opens one socket listener for the active payment order', () => {
    renderWithProviders(<PaymentStatusListener />, {
      preloadedState: {
        payment: {
          activeOrder: {
            amount: 56,
            currencyCode: 'EUR',
            identifier: 'order-id',
            webUrl: 'https://payments.pre-bnvo.com/order-id',
          },
          selectedCurrencyCode: 'EUR',
        },
      },
    });

    expect(usePaymentStatusSocket).toHaveBeenCalledWith('order-id');
  });
});
