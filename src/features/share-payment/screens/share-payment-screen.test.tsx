import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { act, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { Linking } from 'react-native';

import type { PaymentOrder } from '@/features/payment/model/payment-order';
import { renderWithProviders } from '@/shared/test/render-with-providers';

import { SharePaymentScreen } from './share-payment-screen';

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
}));

jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

jest.mock('expo-router', () => ({
  Redirect: jest.fn(),
  router: {
    back: jest.fn(),
    push: jest.fn(),
  },
}));

jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);

const paymentOrder: PaymentOrder = {
  amount: 56,
  currencyCode: 'EUR',
  identifier: 'order-id',
  webUrl: 'https://payments.pre-bnvo.com/order-id',
};

describe('SharePaymentScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (Linking.openURL as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders the created payment and copies its checkout URL', async () => {
    renderWithProviders(<SharePaymentScreen />, {
      preloadedState: {
        payment: {
          activeOrder: paymentOrder,
          selectedCurrencyCode: 'EUR',
        },
      },
    });

    expect(screen.getByText('Solicitud de pago')).toBeOnTheScreen();
    expect(screen.getByText('56,00 €')).toBeOnTheScreen();

    await act(async () => {
      fireEvent.press(screen.getByLabelText('Copiar enlace de pago'));
    });

    expect(Clipboard.setStringAsync).toHaveBeenCalledWith(paymentOrder.webUrl);
  });

  it('clears the active order when starting a new payment', () => {
    const { store } = renderWithProviders(<SharePaymentScreen />, {
      preloadedState: {
        payment: {
          activeOrder: paymentOrder,
          selectedCurrencyCode: 'EUR',
        },
      },
    });

    fireEvent.press(screen.getByLabelText('Nueva solicitud'));

    expect(store.getState().payment.activeOrder).toBeNull();
    expect(router.back).toHaveBeenCalled();
  });

  it('builds the WhatsApp link with the selected country code and phone number', async () => {
    renderWithProviders(<SharePaymentScreen />, {
      preloadedState: {
        payment: {
          activeOrder: paymentOrder,
          selectedCurrencyCode: 'EUR',
        },
      },
    });

    fireEvent.press(screen.getByLabelText('Seleccionar prefijo de WhatsApp'));
    fireEvent.press(screen.getByText('Venezuela (+58)'));
    fireEvent.changeText(
      screen.getByLabelText('Numero de WhatsApp'),
      '412 123 4567',
    );
    await act(async () => {
      fireEvent.press(screen.getByLabelText('Enviar por WhatsApp'));
    });

    expect(Linking.openURL).toHaveBeenCalledWith(
      `https://wa.me/584121234567?text=${encodeURIComponent(
        `Completa tu pago aquí: ${paymentOrder.webUrl}`,
      )}`,
    );
  });

  it('opens the email composer with the typed recipient', async () => {
    renderWithProviders(<SharePaymentScreen />, {
      preloadedState: {
        payment: {
          activeOrder: paymentOrder,
          selectedCurrencyCode: 'EUR',
        },
      },
    });

    fireEvent.changeText(
      screen.getByLabelText('Correo electronico'),
      'cliente@correo.com',
    );
    await act(async () => {
      fireEvent.press(screen.getByLabelText('Enviar por correo'));
    });

    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith(
        `mailto:cliente@correo.com?subject=${encodeURIComponent(
          'Solicitud de pago',
        )}&body=${encodeURIComponent(
          `Completa tu pago aquí: ${paymentOrder.webUrl}`,
        )}`,
      );
    });
  });
});
