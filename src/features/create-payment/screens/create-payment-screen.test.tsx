import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/shared/test/render-with-providers';

import { CreatePaymentScreen } from './create-payment-screen';

const mockUseCreateOrderMutation = jest.fn();

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('@/features/create-payment/hooks/use-create-order-mutation', () => ({
  useCreateOrderMutation: () => mockUseCreateOrderMutation(),
}));

describe('CreatePaymentScreen', () => {
  beforeEach(() => {
    mockUseCreateOrderMutation.mockReturnValue({
      error: null,
      isError: false,
      isPending: false,
      mutate: jest.fn(),
    });
  });

  it('renders the payment creation form from the Figma flow', () => {
    renderWithProviders(<CreatePaymentScreen />);

    expect(screen.getByText('Crear pago')).toBeOnTheScreen();
    expect(screen.getByLabelText('Importe')).toHaveProp('placeholder', '0.00');
    expect(screen.getByText('€')).toBeOnTheScreen();
    expect(screen.getByText('EUR')).toBeOnTheScreen();
    expect(screen.getByLabelText('Concepto')).toHaveProp(
      'placeholder',
      'Añade descripción del pago',
    );
    expect(screen.getByText('Continuar')).toBeOnTheScreen();
  });

  it('enables continue after entering a valid amount', () => {
    renderWithProviders(<CreatePaymentScreen />);

    const amountInput = screen.getByLabelText('Importe');
    const continueButton = screen.getByLabelText('Continuar');

    expect(continueButton).toHaveProp(
      'accessibilityState',
      expect.objectContaining({ disabled: true }),
    );

    fireEvent.changeText(amountInput, '12.50');

    expect(amountInput).toHaveProp('value', '12.50');
    expect(continueButton).toHaveProp(
      'accessibilityState',
      expect.objectContaining({ disabled: false }),
    );
  });
});
