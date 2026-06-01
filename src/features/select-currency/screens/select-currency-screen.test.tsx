import { router } from 'expo-router';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/shared/test/render-with-providers';

import { SelectCurrencyScreen } from './select-currency-screen';

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

describe('SelectCurrencyScreen', () => {
  it('renders the currency selector options from the Figma flow', () => {
    renderWithProviders(<SelectCurrencyScreen />);

    expect(screen.getByText('Selecciona una divisa')).toBeOnTheScreen();
    expect(screen.getByLabelText('Buscar divisa')).toHaveProp(
      'placeholder',
      'Buscar',
    );
    expect(screen.getByText('Euro')).toBeOnTheScreen();
    expect(screen.getByText('Libra Esterlina')).toBeOnTheScreen();
  });

  it('stores the selected currency and returns to the payment screen', () => {
    const { store } = renderWithProviders(<SelectCurrencyScreen />);

    fireEvent.press(screen.getByLabelText('Seleccionar EUR'));

    expect(store.getState().payment.selectedCurrencyCode).toBe('EUR');
    expect(router.back).toHaveBeenCalled();
  });

  it('marks the current currency row as selected', () => {
    renderWithProviders(<SelectCurrencyScreen />, {
      preloadedState: {
        payment: {
          activeOrder: null,
          selectedCurrencyCode: 'GBP',
        },
      },
    });

    expect(screen.getByLabelText('Seleccionar GBP')).toHaveProp(
      'accessibilityState',
      expect.objectContaining({ selected: true }),
    );
  });

  it('filters the currency list while typing in the search field', () => {
    renderWithProviders(<SelectCurrencyScreen />);

    fireEvent.changeText(screen.getByLabelText('Buscar divisa'), 'libra');

    expect(screen.getByText('Libra Esterlina')).toBeOnTheScreen();
    expect(screen.queryByText('Euro')).not.toBeOnTheScreen();
  });

  it('shows an empty state when no currency matches the search', () => {
    renderWithProviders(<SelectCurrencyScreen />);

    fireEvent.changeText(screen.getByLabelText('Buscar divisa'), 'yen');

    expect(
      screen.getByText('No tenemos la divisa que buscas, pronto la tendremos.'),
    ).toBeOnTheScreen();
  });
});
