import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { defaultCurrencyCode, type CurrencyCode } from './currencies';
import type { PaymentOrder } from './payment-order';

export type PaymentState = {
  activeOrder: PaymentOrder | null;
  selectedCurrencyCode: CurrencyCode;
};

const initialState: PaymentState = {
  activeOrder: null,
  selectedCurrencyCode: defaultCurrencyCode,
};

const paymentSlice = createSlice({
  initialState,
  name: 'payment',
  reducers: {
    clearActiveOrder: (state) => {
      state.activeOrder = null;
    },
    setActiveOrder: (state, action: PayloadAction<PaymentOrder>) => {
      state.activeOrder = action.payload;
    },
    setSelectedCurrencyCode: (state, action: PayloadAction<CurrencyCode>) => {
      state.selectedCurrencyCode = action.payload;
    },
  },
});

export const { clearActiveOrder, setActiveOrder, setSelectedCurrencyCode } =
  paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
