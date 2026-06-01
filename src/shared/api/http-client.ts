import { bitnovoApiConfig } from '@/shared/config/app-config';

import { ApiError } from './api-error';

type HttpClientConfig = {
  baseUrl: string;
  deviceId?: string;
  timeoutMs: number;
};

const readPayload = async (response: Response) => {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
};

export const createHttpClient = (config: HttpClientConfig) => {
  const post = async <TResponse>(path: string, body: FormData) => {
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => {
      timeoutController.abort();
    }, config.timeoutMs);

    try {
      const response = await fetch(`${config.baseUrl}${path}`, {
        body,
        headers: {
          Accept: 'application/json',
          ...(config.deviceId ? { 'X-Device-Id': config.deviceId } : {}),
        },
        method: 'POST',
        signal: timeoutController.signal,
      });
      const payload = await readPayload(response);

      if (!response.ok) {
        throw new ApiError({
          message: response.statusText || 'Request failed',
          payload,
          status: response.status,
        });
      }

      return payload as TResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError({
          message: `Request timed out after ${config.timeoutMs}ms`,
          status: 408,
        });
      }

      throw new ApiError({
        message:
          error instanceof Error ? error.message : 'Unknown request error',
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return { post };
};

export const bitnovoHttpClient = createHttpClient({
  baseUrl: bitnovoApiConfig.baseUrl,
  ...(bitnovoApiConfig.deviceId ? { deviceId: bitnovoApiConfig.deviceId } : {}),
  timeoutMs: bitnovoApiConfig.timeoutMs,
});
