import { ApiError } from './api-error';
import { createHttpClient } from './http-client';

const jsonResponse = (body: unknown, init: ResponseInit = {}) => {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });
};

describe('createHttpClient', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  it('posts form data with the Bitnovo device header', async () => {
    const payload = { identifier: 'order-id' };
    const formData = new FormData();
    formData.append('expected_output_amount', '12');
    jest.mocked(fetch).mockResolvedValueOnce(jsonResponse(payload));

    const client = createHttpClient({
      baseUrl: 'https://payments.pre-bnvo.com',
      deviceId: 'device-id',
      timeoutMs: 10_000,
    });

    await expect(client.post('/api/v1/orders', formData)).resolves.toEqual(
      payload,
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://payments.pre-bnvo.com/api/v1/orders',
      expect.objectContaining({
        body: formData,
        headers: {
          Accept: 'application/json',
          'X-Device-Id': 'device-id',
        },
        method: 'POST',
      }),
    );
  });

  it('throws ApiError when the response is not ok', async () => {
    jest
      .mocked(fetch)
      .mockResolvedValueOnce(
        jsonResponse(
          { detail: 'Invalid payload' },
          { status: 400, statusText: 'Bad Request' },
        ),
      );

    const client = createHttpClient({
      baseUrl: 'https://payments.pre-bnvo.com',
      timeoutMs: 10_000,
    });

    const expectedError: Partial<ApiError> = {
      message: 'Bad Request',
      name: 'ApiError',
      payload: { detail: 'Invalid payload' },
      status: 400,
    };

    await expect(
      client.post('/api/v1/orders', new FormData()),
    ).rejects.toMatchObject(expectedError);
  });
});
