import type { StoreEnhancer } from 'redux';

type ReactotronWithRedux = typeof import('reactotron-react-native').default & {
  createEnhancer: () => StoreEnhancer;
};

declare const require: <T = unknown>(moduleName: string) => T;

const shouldConnectReactotron = __DEV__ && process.env.NODE_ENV !== 'test';

const createReactotronReduxEnhancer = () => {
  if (!shouldConnectReactotron) {
    return undefined;
  }

  const Reactotron = require<
    typeof import('reactotron-react-native')
  >('reactotron-react-native').default as ReactotronWithRedux;
  const { reactotronRedux } = require<
    typeof import('reactotron-redux')
  >('reactotron-redux');

  Reactotron.configure({ name: 'BitnovoTT' })
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate|logs/i,
      },
    })
    .use(reactotronRedux())
    .connect();

  return Reactotron.createEnhancer();
};

export const reactotronReduxEnhancer = createReactotronReduxEnhancer();
