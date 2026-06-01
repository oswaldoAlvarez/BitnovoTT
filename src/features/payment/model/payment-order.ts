import type { CurrencyCode } from './currencies';

export type PaymentOrder = {
  amount: number;
  currencyCode: CurrencyCode;
  identifier: string;
  webUrl: string;
};
