import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reactotronReduxEnhancer } from '@/core/devtools/reactotron';
import { paymentReducer } from '@/features/payment/model/payment-slice';

const rootReducer = combineReducers({
  payment: paymentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createAppStore = (preloadedState?: Partial<RootState>) => {
  const baseConfig = {
    ...(preloadedState ? { preloadedState } : {}),
    reducer: rootReducer,
  };

  const reduxEnhancer = reactotronReduxEnhancer;

  if (!reduxEnhancer) {
    return configureStore(baseConfig);
  }

  return configureStore({
    ...baseConfig,
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(reduxEnhancer),
  });
};

export const store = createAppStore();
export type AppDispatch = typeof store.dispatch;
