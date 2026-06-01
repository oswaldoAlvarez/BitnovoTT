declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_BITNOVO_API_BASE_URL?: string;
    EXPO_PUBLIC_BITNOVO_DEVICE_ID?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
  }
}
