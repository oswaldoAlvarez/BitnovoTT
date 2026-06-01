import type { RootState } from '@/core/store/store';

import { getPaymentCurrencyByCode } from './currencies';

export const selectActivePaymentOrder = (state: RootState) => {
  return state.payment.activeOrder;
};

export const selectSelectedCurrencyCode = (state: RootState) => {
  return state.payment.selectedCurrencyCode;
};

export const selectSelectedCurrency = (state: RootState) => {
  return getPaymentCurrencyByCode(selectSelectedCurrencyCode(state));
};
