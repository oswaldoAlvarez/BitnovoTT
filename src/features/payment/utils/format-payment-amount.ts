import {
  getPaymentCurrencyByCode,
  type CurrencyCode,
} from '../model/currencies';

export const formatPaymentAmount = (
  amount: number,
  currencyCode: CurrencyCode,
) => {
  const currency = getPaymentCurrencyByCode(currencyCode);

  return `${amount.toFixed(2).replace('.', ',')} ${currency.symbol}`;
};
