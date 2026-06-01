import { router } from 'expo-router';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/shared/test/render-with-providers';

import { PaymentCompletedScreen } from './payment-completed-screen';

jest.mock('expo-router', () => ({
  Redirect: jest.fn(),
  router: {
    replace: jest.fn(),
  },
}));

describe('PaymentCompletedScreen', () => {
  it('clears the active order when the completed flow finishes', () => {
    const { store } = renderWithProviders(<PaymentCompletedScreen />, {
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

    expect(screen.getByText('Pago recibido')).toBeOnTheScreen();

    fireEvent.press(screen.getByLabelText('Finalizar'));

    expect(store.getState().payment.activeOrder).toBeNull();
    expect(router.replace).toHaveBeenCalledWith('/create-payment');
  });
});
