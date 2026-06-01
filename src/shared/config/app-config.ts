type BitnovoApiConfig = {
  baseUrl: string;
  deviceId?: string;
  timeoutMs: number;
};

export const bitnovoApiConfig: BitnovoApiConfig = {
  baseUrl:
    process.env.EXPO_PUBLIC_BITNOVO_API_BASE_URL ??
    'https://payments.pre-bnvo.com/api/v1',
  ...(process.env.EXPO_PUBLIC_BITNOVO_DEVICE_ID
    ? { deviceId: process.env.EXPO_PUBLIC_BITNOVO_DEVICE_ID }
    : {}),
  timeoutMs: 10_000,
};
