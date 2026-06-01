import type { PropsWithChildren, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { createAppStore, type RootState } from '@/core/store/store';

type RenderWithProvidersOptions = RenderOptions & {
  preloadedState?: Partial<RootState>;
};

export const renderWithProviders = (
  ui: ReactElement,
  { preloadedState, ...renderOptions }: RenderWithProvidersOptions = {},
) => {
  const store = createAppStore(preloadedState);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  };

  return {
    queryClient,
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
