import { screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/shared/test/render-with-providers';

import { PaymentQrScreen } from './payment-qr-screen';

jest.mock('expo-router', () => ({
  Redirect: jest.fn(),
  router: {
    back: jest.fn(),
  },
}));

describe('PaymentQrScreen', () => {
  it('renders a QR code for the active payment order', () => {
    renderWithProviders(<PaymentQrScreen />, {
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

    expect(screen.getByLabelText('Código QR de pago')).toBeOnTheScreen();
    expect(screen.getByText('56,00 €')).toBeOnTheScreen();
    expect(
      screen.getByText(
        'Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay.',
      ),
    ).toBeOnTheScreen();
    expect(
      screen.getByText('Esta pantalla se actualizará automáticamente.'),
    ).toBeOnTheScreen();
  });
});
