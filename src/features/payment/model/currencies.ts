export type CurrencyCode = 'EUR' | 'GBP';

export type PaymentCurrency = {
  code: CurrencyCode;
  name: string;
  symbol: string;
  symbolPosition: 'left' | 'right';
};

export const defaultPaymentCurrency: PaymentCurrency = {
  code: 'EUR',
  name: 'Euro',
  symbol: '€',
  symbolPosition: 'right',
};

export const paymentCurrencies: PaymentCurrency[] = [
  defaultPaymentCurrency,
  {
    code: 'GBP',
    name: 'Libra Esterlina',
    symbol: '£',
    symbolPosition: 'right',
  },
];

export const defaultCurrencyCode: CurrencyCode = 'EUR';

export const getPaymentCurrencyByCode = (code: CurrencyCode) => {
  return (
    paymentCurrencies.find((currency) => currency.code === code) ??
    defaultPaymentCurrency
  );
};
