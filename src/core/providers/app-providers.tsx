import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@/core/query/query-client';
import { store } from '@/core/store/store';
import { PaymentStatusListener } from '@/features/payment/components/payment-status-listener';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PaymentStatusListener />
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};
